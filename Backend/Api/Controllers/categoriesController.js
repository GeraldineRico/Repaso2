var categoriesController = {} //objeto que contiene los controladores

// vincular el controlador con el modelo
var categoriesModel = require(__dirname + '/../Models/categoriesModel.js').modelCategories
const mongoose = require('mongoose') //para importar mongoose

categoriesController.save = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataCategories = {
        code: request.body.code,
        nameCategories: request.body.nameCategories,
        detail: request.body.detail
    }

    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataCategories.code == "" || dataCategories.code == null || dataCategories.code == undefined) {
        response.json({ state: false, mensaje: "El campo código de la categoria es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataCategories.code.length < 1) {
        response.json({ state: false, mensaje: "El campo código de la categoria debe ser igual o mayor a 1 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataCategories.code.length > 5) {
        response.json({ state: false, mensaje: "El campo código de la categoria no debe ser superior de 5 caracteres" })
        return false
    }

    //para validar que el dato nombre no este vacio, nulo o indefinido
    if (dataCategories.nameCategories == "" || dataCategories.nameCategories == null || dataCategories.nameCategories == undefined) {
        response.json({ state: false, mensaje: "El campo nombre de la categoria es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataCategories.nameCategories.length < 3) {
        response.json({ state: false, mensaje: "El campo nombre de la categoria debe ser mayor de 3 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataCategories.nameCategories.length > 20) {
        response.json({ state: false, mensaje: "El campo nombre de la categoria no debe ser superior de 20 caracteres" })
        return false
    }

    if (dataCategories.detail == "" || dataCategories.detail == null || dataCategories.detail == undefined) {
        response.json({ state: false, mensaje: "El campo detalle de la categoria es obligatorio" })
        return false
    }

    // Entrega el resultado de la validación anterior al modelo, con una respuesta 
    categoriesModel.save(dataCategories, function (answerSave) {
        
        if (answerSave.state == true) {
            response.json({ state: true, mensaje: "Se guardó el categoria correctamente" })
        } else {
            response.json({ state: false, mensaje: "Se presentó un error al guardar el categoria" })
        }
    })

}


categoriesController.loadAll = function (request, response) {

    // Aquí se llama la funcionalidad del modelo y muestra la respuesta
    categoriesModel.loadAll(null, function (answerAll) {
        
        response.json(answerAll)
    })
}

categoriesController.loadIdentification = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataCategories = {
        id: request.body.id,
    }

    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataCategories.id == "" || dataCategories.id == null || dataCategories.id == undefined) {
        response.json({ state: false, mensaje: "El campo id de la categoria es obligatorio" })
        return false
    }

    categoriesModel.loadIdentification(dataCategories, function (answerLoad) {
        
        response.json(answerLoad)
    })

}

categoriesController.updateIdentification = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataCategories = {
        id: request.body.id,
        code: request.body.code,
        nameCategories: request.body.nameCategories,
        detail: request.body.detail
    }

    //validaciones de los datos que esta recibiendo el controlador

    if (dataCategories.id == undefined || dataCategories.id == null || dataCategories.id == "") {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataCategories.code == "" || dataCategories.code == null || dataCategories.code == undefined) {
        response.json({ state: false, mensaje: "El campo código de la categoria es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataCategories.code.length < 1) {
        response.json({ state: false, mensaje: "El campo código de la categoria debe ser igual o mayor a 8 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataCategories.code.length > 5) {
        response.json({ state: false, mensaje: "El campo código de la categoria no debe ser superior de 10 caracteres" })
        return false
    }

    //para validar que el dato nombre no este vacio, nulo o indefinido
    if (dataCategories.nameCategories == "" || dataCategories.nameCategories == null || dataCategories.nameCategories == undefined) {
        response.json({ state: false, mensaje: "El campo nombre de la categoria es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataCategories.nameCategories.length < 3) {
        response.json({ state: false, mensaje: "El campo nombre de la categoria debe ser mayor de 3 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataCategories.nameCategories.length > 20) {
        response.json({ state: false, mensaje: "El campo nombre de la categoria no debe ser superior de 20 caracteres" })
        return false
    }

    if (dataCategories.detail == "" || dataCategories.detail == null || dataCategories.detail == undefined) {
        response.json({ state: false, mensaje: "El campo detalle de la categoria es obligatorio" })
        return false
    }

    categoriesModel.updateIdentification(dataCategories, function (answerUpdate) {
        
        if (answerUpdate.state = true) {
            response.json({ state: true, mensaje: "Se actualizó correctamente" })
        } else {
            response.json({ state: false, mensaje: "Se presentó un error al actualizar" })
        }
    })
}

categoriesController.delete = function (request, response) {

     //aquí se establecen los datos que recibe el modelo 
     var dataCategories = {
        id: request.body.id,
    }

    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataCategories.id == "" || dataCategories.id == null || dataCategories.id == undefined) {
        response.json({ state: false, mensaje: "El campo id de la categoria es obligatorio" })
        return false
    }

    categoriesModel.delete(dataCategories,function(answerDelete){
        
        if(answerDelete.state == true){
            response.json({state:true,mensaje:"Se eliminó correctamente"})
        }else{
            response.json({state:false,mensaje:"Se presentó un error al eliminar"})
        }
    })
}

module.exports.controllerCategories = categoriesController // para exportar los controladores y que se puedan usar en las rutas