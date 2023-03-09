var express = require('express') //para importar la libreria de express
global.app = express() //para indicar que la app usa la libreria de express
global.config = require(__dirname + '/config.js').configuracion //para importar la información de configuración
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) //importar body-parser para que permita trabajar con peticiones tipo POST
const mongoose = require('mongoose') //para importar mongoose
const MongoStore = require('connect-mongo') // para que la cookie se guarde en mongo


//para definir el tipo de peticiones que va a recibir la app, direcciones web que pueden ingresar(cabeceras)
app.all('*',function(request,response,next){
    var whitelist = request.headers.origin;

    response.header('Access-Control-Allow-Origin', whitelist)
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    response.header('Access-Control-Allow-Headers', " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    response.header("Access-Control-Allow-Credentials", "true");

    next()
}) 

var session = require('express-session')({
    secret: config.claveOculta,
    resave: true,
    saveUninitialized: true,
    cookie: {path:"/",httpOnly:true, maxAge: config.tiempoSession},
    name: config.cookieName,
    rolling:true,
    store: MongoStore.create({mongoUrl: 'mongodb://127.0.0.1:27017/' + config.db + 'Cookie'})
})

app.use(session)

//para indicar que la app usa la libreria cors 
var cors = require('cors')

//se definen las direcciones que tiene acceso, mediante el "Origin", se verifica que este autorizado
app.use(cors({
    origin: function (origin, callback) {
        
        if (!origin) return callback(null, true)

        if (config.listaBlanca.indexOf(origin) === -1) {
            return callback('error cors', false)
        }

        return callback(null, true)
    }
}))

//conexión a las rutas (routes)
require(__dirname + '/routes.js')


// para cargar imagenes, static permite definir la carpeta donde se van a guardar las imagenes
app.use('/archivos', express.static(__dirname + '/Files'))

app.listen(config.puerto, function(){
    console.log ('servidor funcionando por el puerto ' + config.puerto )
})

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/' + config.db,{useNewUrlParser:true,useUnifiedTopology:true},(error,response) => {
    if(error){
        console.log(error)
    }
    else{
        console.log('Conexión a la DB correcta')
    }
})