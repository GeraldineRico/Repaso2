var productsController = {} //objeto que contiene los controladores

// vincular el controlador con el modelo
var productsModel = require(__dirname + '/../Models/productsModel.js').modelProducts


productsController.save = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataProduct = {
        code: request.body.code,
        nameProduct: request.body.nameProduct
    }

    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataProduct.code == "" || dataProduct.code == null || dataProduct.code == undefined) {
        response.json({ state: false, mensaje: "El campo código del producto es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataProduct.code.length < 1) {
        response.json({ state: false, mensaje: "El campo código del producto debe ser igual o mayor a 8 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataProduct.code.length > 5) {
        response.json({ state: false, mensaje: "El campo código del producto no debe ser superior de 10 caracteres" })
        return false
    }

    //para validar que el dato nombre no este vacio, nulo o indefinido
    if (dataProduct.nameProduct == "" || dataProduct.nameProduct == null || dataProduct.nameProduct == undefined) {
        response.json({ state: false, mensaje: "El campo nombre del producto es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataProduct.nameProduct.length < 3) {
        response.json({ state: false, mensaje: "El campo nombre del producto debe ser mayor de 3 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataProduct.nameProduct.length > 20) {
        response.json({ state: false, mensaje: "El campo nombre del producto no debe ser superior de 20 caracteres" })
        return false
    }

    // Entrega el resultado de la validación anterior al modelo, con una respuesta 
    productsModel.save(dataProduct, function (answerSave) {
        
        if (answerSave.state == true) {
            response.json({ state: true, mensaje: "Se registró correctamente" })
        } else {
            response.json({ state: false, mensaje: "Se presentó un error al registrar" })
        }
    })

}


productsController.loadAll = function (request, response) {

    // Aquí se llama la funcionalidad del modelo y muestra la respuesta
    productsModel.loadAll(null, function (answerAll) {
        
        response.json(answerAll)
    })
}

productsController.loadIdentification = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataProduct = {
        code: request.body.code,
    }

    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataProduct.code == "" || dataProduct.code == null || dataProduct.code == undefined) {
        response.json({ state: false, mensaje: "El campo código del producto es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataProduct.code.length < 1) {
        response.json({ state: false, mensaje: "El campo código del producto debe ser igual o mayor a 8 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataProduct.code.length > 5) {
        response.json({ state: false, mensaje: "El campo código del producto no debe ser superior de 10 caracteres" })
        return false
    }

    productsModel.loadIdentification(dataProduct, function (answerLoad) {
        
        response.json(answerLoad)
    })

}

productsController.updateIdentification = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataProduct = {
        code: request.body.code,
        nameProduct: request.body.nameProduct,
    }

    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataProduct.code == "" || dataProduct.code == null || dataProduct.code == undefined) {
        response.json({ state: false, mensaje: "El campo código del producto es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataProduct.code.length < 1) {
        response.json({ state: false, mensaje: "El campo código del producto debe ser igual o mayor a 8 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataProduct.code.length > 5) {
        response.json({ state: false, mensaje: "El campo código del producto no debe ser superior de 10 caracteres" })
        return false
    }

    //para validar que el dato nombre no este vacio, nulo o indefinido
    if (dataProduct.nameProduct == "" || dataProduct.nameProduct == null || dataProduct.nameProduct == undefined) {
        response.json({ state: false, mensaje: "El campo nombre del producto es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataProduct.nameProduct.length < 3) {
        response.json({ state: false, mensaje: "El campo nombre del producto debe ser mayor de 3 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataProduct.nameProduct.length > 20) {
        response.json({ state: false, mensaje: "El campo nombre del producto no debe ser superior de 20 caracteres" })
        return false
    }

    productsModel.updateIdentification(dataProduct, function (answerUpdate) {
        
        if (answerUpdate.state = true) {
            response.json({ state: true, mensaje: "Se actualizó correctamente" })
        } else {
            response.json({ state: false, mensaje: "Se presentó un error al actualizar" })
        }
    })
}

productsController.delete = function (request, response) {

     //aquí se establecen los datos que recibe el modelo 
     var dataProduct = {
        code: request.body.code,
    }

    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataProduct.code == "" || dataProduct.code == null || dataProduct.code == undefined) {
        response.json({ state: false, mensaje: "El campo código del producto es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataProduct.code.length < 1) {
        response.json({ state: false, mensaje: "El campo código del producto debe ser igual o mayor a 8 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataProduct.code.length > 5) {
        response.json({ state: false, mensaje: "El campo código del producto no debe ser superior de 10 caracteres" })
        return false
    }

    productsModel.delete(dataProduct,function(answerDelete){
        
        if(answerDelete.state == true){
            response.json({state:true,mensaje:"Se eliminó correctamente"})
        }else{
            response.json({state:false,mensaje:"Se presentó un error al eliminar"})
        }
    })
}

module.exports.controllerProducts = productsController // para exportar los controladores y que se puedan usar en las rutas