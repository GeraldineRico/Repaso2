// rutas de clientes que se logueen. 

// vincular las rutas con el controlador
var clientsController = require(__dirname + '/Api/Controllers/clientsController.js').controllerClients
// para validar si la session está abierta
var validarSession = function (request, response, next) {
    if (request.session.rol == undefined || request.session.rol == null || request.session.rol == "") {
        response.json({ state: false, mensaje: "Su sesión expiró", redireccion: true })
        return false
    }
    else {
        next()
    }
}

//configuración de las rutas
app.post("/clients/save", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    clientsController.save(request, response)
})

app.post("/clients/loadAll", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    clientsController.loadAll(request, response)
})

app.post("/clients/loadIdentification", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    clientsController.loadIdentification(request, response)
})

app.post("/clients/updateIdentification", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    clientsController.updateIdentification(request, response)
})

app.post("/clients/delete", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    clientsController.delete(request, response)
})

app.post("/clients/login", function (request, response) {
    clientsController.Login(request, response)
})

app.post("/clients/verCookie", function (request, response) {
    response.json({ clave: request.session })
})

app.post("/clients/menuPrincipal", function (request, response) {
    var menu = [
        { nombre: 'HOME', destino: '/Home' },
        { nombre: 'CATEGORIAS', destino: '/Productos' },
        { nombre: 'FAVORITOS', destino: '/Favoritos' },
        { nombre: 'MI PERFIL', destino: '/MiPerfil' },
    ]
    if (request.session.rol == 2) {
        response.json({
            state: true, menu: menu
        })
    }
    else if (request.session.rol == 1) {

        var menu = [
            { nombre: 'HOME', destino: '/Home' },
            { nombre: 'CATEGORIAS', destino: '/Productos' },
            { nombre: 'REGISTRO', destino: '/Registro' },
            { nombre: 'DASHBOARD', destino: '/DashboardAdmin' }
        ]
        //console.log(request.session)
        response.json({
            state: true, menu: menu
        })

    } else {
        var menu = [
            { nombre: 'HOME', destino: '/Home' },
            { nombre: 'CATEGORIAS', destino: '/Productos' },
            { nombre: 'REGISTRO', destino: '/Registro' },
        ]
        //console.log(request.session)
        response.json({
            state: false, menu: menu
        })
    }
})

//se crea una peticion de tipo get para que reciba dos datos email y codigo y que el ciente se valide por medio de link
app.get("/activar/:email/:codigo", function (request, response) {
    clientsController.Activar(request, response)
})




// rutas de productos

// vincular las rutas con el controlador
var productsController = require(__dirname + '/Api/Controllers/productsController.js').controllerProducts

//configuración de las rutas
app.post("/products/save", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    productsController.save(request, response)
})

app.post("/products/loadAll", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    productsController.loadAll(request, response)
})

app.post("/products/loadIdentification", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    productsController.loadIdentification(request, response)
})

app.post("/products/updateIdentification", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    productsController.updateIdentification(request, response)
})

app.post("/products/delete", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    productsController.delete(request, response)
})



// rutas de Administradores

// vincular las rutas con el controlador
var adminsController = require(__dirname + '/Api/Controllers/adminsController.js').controllerAdmins




//configuración de las rutas
app.post("/admins/save", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    adminsController.save(request, response)
})

app.post("/admins/loadAll", validarSession, function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    adminsController.loadAll(request, response)
})

app.post("/admins/loadIdentification", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    adminsController.loadIdentification(request, response)
})

app.post("/admins/updateIdentification", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    adminsController.updateIdentification(request, response)
})

app.post("/admins/delete", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    adminsController.delete(request, response)
})

app.post("/admins/login", function (request, response) {
    adminsController.Login(request, response)
})



// rutas de categorias

// vincular las rutas con el controlador
var categoriesController = require(__dirname + '/Api/Controllers/categoriesController.js').controllerCategories

//configuración de las rutas
app.post("/categories/save", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    categoriesController.save(request, response)
})

app.post("/categories/loadAll", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    categoriesController.loadAll(request, response)
})

app.post("/categories/loadIdentification", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    categoriesController.loadIdentification(request, response)
})

app.post("/categories/updateIdentification", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    categoriesController.updateIdentification(request, response)
})

app.post("/categories/delete", function (request, response) {
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    categoriesController.delete(request, response)
})



app.post("/cerrarSesion", function (request, response) {
    request.session.destroy()
    response.json({ state: true })
})

//para hacer uso de la librera multer
const multer = require("multer")
const path = require("path")
global.path = require("path")

app.post("/subirImagenes/:name", function (req, res) {

    console.log(req.params)
    var post = {
        //carpeta donde se almacenan las imagenes
        ruta: '/Files'
    }

    //configuración de multer
    var upload = multer({
        //procedimiento para almacenar la imagen
        storage: multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, __dirname + post.ruta)
            },
            filename: function (req, file, callback) {
                console.log(file)
                //originalname guarda el archivo con el nombre con el que se suba
                var ext = path.extname(file.originalname)
                callback(null, req.params.name + ext)
            }
        }),
        //que tipos de imagenes se pueden cargar
        fileFilter: function (req, file, callback) {
            //extraer la extensión del archivo
            var ext = path.extname(file.originalname)
            console.log(ext)
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.tif' && ext !== '.gif') {
                return callback({ state: false, mensaje: "Solo imagenes con extensión png, jpg, tif o gif" }, null)
            }
            callback(null, true)
        }

        //nombre llave para subir archivos es el nombre que se usa en la petición  
    }).single('userFile')

    upload(req, res, function (err) {
        if (err) {
            console.log(err)
            res.json(err)
        }
        else {
            console.log("Ok")
            res.json({ state: true, mensaje: "Archivo cargado" })
        }
    })
})

app.post("/FotoPerfil/:name", function (req, res) {

    console.log(req.params)
    var post = {
        //carpeta donde se almacenan las imagenes
        ruta: '/FotoPerfil'
    }

    //configuración de multer
    var upload = multer({
        //procedimiento para almacenar la imagen
        storage: multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, __dirname + post.ruta)
            },
            filename: function (req, file, callback) {
                console.log(file)
                //originalname guarda el archivo con el nombre con el que se suba
                var ext = path.extname(file.originalname)
                callback(null, req.params.name + ext)
            }
        }),
        //que tipos de imagenes se pueden cargar
        fileFilter: function (req, file, callback) {
            //extraer la extensión del archivo
            var ext = path.extname(file.originalname)
            console.log(ext)
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.tif' && ext !== '.gif') {
                return callback({ state: false, mensaje: "Solo imagenes con extensión png, jpg, tif o gif" }, null)
            }
            callback(null, true)
        }

        //nombre llave para subir archivos es el nombre que se usa en la petición  
    }).single('userFile')

    upload(req, res, function (err) {
        if (err) {
            console.log(err)
            res.json(err)
        }
        else {
            console.log("Ok")
            res.json({ state: true, mensaje: "Archivo cargado" })
        }
    })
})

app.post("/imagenProductos/:name", function (req, res) {

    console.log(req.params)
    var post = {
        //carpeta donde se almacenan las imagenes
        ruta: '/productos'
    }

    //configuración de multer
    var upload = multer({
        //procedimiento para almacenar la imagen
        storage: multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, __dirname + post.ruta)
            },
            filename: function (req, file, callback) {
                console.log(file)
                //originalname guarda el archivo con el nombre con el que se suba
                var ext = path.extname(file.originalname)
                callback(null, req.params.name + ext)
            }
        }),
        //que tipos de imagenes se pueden cargar
        fileFilter: function (req, file, callback) {
            //extraer la extensión del archivo
            var ext = path.extname(file.originalname)
            console.log(ext)
            if (ext !== '.png') {
                return callback({ state: false, mensaje: "Solo imagenes con extensión png" }, null)
            }
            callback(null, true)
        }

        //nombre llave para subir archivos es el nombre que se usa en la petición  
    }).single('userFile')

    upload(req, res, function (err) {
        if (err) {
            console.log(err)
            res.json(err)
        }
        else {
            console.log("Ok")
            res.json({ state: true, mensaje: "Archivo cargado" })
        }
    })
})

// app.post("/imagenCategorias/:name", function (req, res) {

//     console.log(req.params)
//     var post = {
//         //carpeta donde se almacenan las imagenes
//         ruta: '/categorias'
//     }

//     //configuración de multer
//     var upload = multer({
//         //procedimiento para almacenar la imagen
//         storage: multer.diskStorage({
//             destination: function (req, file, callback) {
//                 callback(null, __dirname + post.ruta)
//             },
//             filename: function (req, file, callback) {
//                 console.log(file)
//                 //originalname guarda el archivo con el nombre con el que se suba
//                 var ext = path.extname(file.originalname)
//                 callback(null, req.params.name + ext)
//             }
//         }),
//         //que tipos de imagenes se pueden cargar
//         fileFilter: function (req, file, callback) {
//             //extraer la extensión del archivo
//             var ext = path.extname(file.originalname)
//             console.log(ext)
//             if (ext !== '.png') {
//                 return callback({ state: false, mensaje: "Solo imagenes con extensión png" }, null)
//             }
//             callback(null, true)
//         }

//         //nombre llave para subir archivos es el nombre que se usa en la petición  
//     }).single('userFile')

//     upload(req, res, function (err) {
//         if (err) {
//             console.log(err)
//             res.json(err)
//         }
//         else {
//             console.log("Ok")
//             res.json({ state: true, mensaje: "Archivo cargado" })
//         }
//     })
// })
