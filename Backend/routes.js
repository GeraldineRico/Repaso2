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