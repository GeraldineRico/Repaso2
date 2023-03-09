var config = {} // objeto donde se guardan las configuraciones

config.puerto = 3000 //confguración del puerto por el que se monta el servidor
config.listaBlanca = [ //direcciones que van a tener acceso a la app
    'http://127.0.0.1:5000', // cuando se levanta el servidor esta es la dirección por la que funciona
    'http://localhost:4200',
    'http://localhost:3000'

]
config.db = "ByGUrban"
config.tiempoSession = (60000 * 30)
config.claveOculta = "claveOculta"
config.cookieName = 'FinalCookie'
config.host = "smtp.gmail.com"
config.port = 587
config.user = "bygurbanc@gmail.com"
config.pass = "qpaesblbcdhmdhhf"

module.exports.configuracion = config // exportar la configuración para que sea pueda usar