// rutas de clientes que se logueen. 

// vincular las rutas con el controlador
var clientsController = require(__dirname + '/Api/Controllers/clientsController.js').controllerClients

//configuración de las rutas
app.post("/clients/save",function(request,response){
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    clientsController.save(request,response)
})

app.post("/clients/loadAll",function(request,response){
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    clientsController.loadAll(request,response)
})

app.post("/clients/loadIdentification",function(request,response){
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    clientsController.loadIdentification(request,response)
})

app.post("/clients/updateIdentification",function(request,response){
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    clientsController.updateIdentification(request,response)
})

app.post("/clients/delete",function(request,response){
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    clientsController.delete(request,response)
})

app.post("/clients/login",function(request,response){
    adminsController.Login(request,response)
})





// rutas de productos

// vincular las rutas con el controlador
var productsController = require(__dirname + '/Api/Controllers/productsController.js').controllerProducts

//configuración de las rutas
app.post("/products/save",function(request,response){
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    productsController.save(request,response)
})

app.post("/products/loadAll",function(request,response){
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    productsController.loadAll(request,response)
})

app.post("/products/loadIdentification",function(request,response){
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    productsController.loadIdentification(request,response)
})

app.post("/products/updateIdentification",function(request,response){
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    productsController.updateIdentification(request,response)
})

app.post("/products/delete",function(request,response){
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    productsController.delete(request,response)
})



// rutas de Administradores

// vincular las rutas con el controlador
var adminsController = require(__dirname + '/Api/Controllers/adminsController.js').controllerAdmins


// para validar si la session está abierta
var validarSession = function(request,response,next){
    if(request.session.rol == undefined || request.session.rol == null || request.session.rol ==""){
        response.json({state:false,mensaje:"Su sesión expiró"})
        return false
    }
    else{
        next()
    }
}

//configuración de las rutas
app.post("/admins/save",function(request,response){
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    adminsController.save(request,response)
})

app.post("/admins/loadAll", validarSession, function(request,response){
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    adminsController.loadAll(request,response)
})

app.post("/admins/loadIdentification",function(request,response){
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    adminsController.loadIdentification(request,response)
})

app.post("/admins/updateIdentification",function(request,response){
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    adminsController.updateIdentification(request,response)
})

app.post("/admins/delete",function(request,response){
    // se llama la función que esta dentro del controlador y se le entrega el request y response que entrega la ruta para que el controlador pueda respoder
    adminsController.delete(request,response)
})

app.post("/admins/login",function(request,response){
    adminsController.Login(request,response)
})

app.post("/admins/verCookie",function(request,response){
    response.json({clave:request.session})
})