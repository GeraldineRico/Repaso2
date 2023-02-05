var clientsController = {} //objeto que contiene los controladores

// vincular el controlador con el modelo
var clientsModel = require(__dirname + '/../Models/clientsModel.js').modelClients


clientsController.save = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataClient = {
        identification: request.body.identification,
        name: request.body.name,
        lastName: request.body.lastName,
        adress: request.body.adress,
        phone: request.body.phone,
        age: request.body.age,
        status: request.body.status
    }

    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataClient.identification == "" || dataClient.identification == null || dataClient.identification == undefined) {
        response.json({ state: false, mensaje: "El campo cédula es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataClient.identification.length < 8) {
        response.json({ state: false, mensaje: "El campo cédula debe ser igual o mayor a 8 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataClient.identification.length > 10) {
        response.json({ state: false, mensaje: "El campo cédula no debe ser superior de 10 caracteres" })
        return false
    }

    //para validar que el dato nombre no este vacio, nulo o indefinido
    if (dataClient.name == "" || dataClient.name == null || dataClient.name == undefined) {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataClient.name.length < 3) {
        response.json({ state: false, mensaje: "El campo nombre debe ser mayor de 3 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataClient.name.length > 20) {
        response.json({ state: false, mensaje: "El campo nombre no debe ser superior de 20 caracteres" })
        return false
    }

    //para validar que el dato apellido no este vacio, nulo o indefinido
    if (dataClient.lastName == "" || dataClient.lastName == null || dataClient.lastName == undefined) {
        response.json({ state: false, mensaje: "El campo apellido es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataClient.lastName.length < 3) {
        response.json({ state: false, mensaje: "El campo apellido debe ser mayor de 3 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataClient.lastName.length > 20) {
        response.json({ state: false, mensaje: "El campo apellido no debe ser superior de 20 caracteres" })
        return false
    }

    //para validar que el dato direccion no este vacio, nulo o indefinido
    if (dataClient.adress == "" || dataClient.adress == null || dataClient.adress == undefined) {
        response.json({ state: false, mensaje: "El campo dirección es obligatorio" })
        return false
    }

    //para validar que el dato telefono no este vacio, nulo o indefinido
    if (dataClient.phone == "" || dataClient.phone == null || dataClient.phone == undefined) {
        response.json({ state: false, mensaje: "El campo teléfono es obligatorio" })
        return false
    }


    //para validar que el dato edad no este vacio, nulo o indefinido
    if (dataClient.age == "" || dataClient.age == null || dataClient.age == undefined) {
        response.json({ state: false, mensaje: "El campo edad es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataClient.age < 18) {
        response.json({ state: false, mensaje: "Para registrarse en nuestra página debe ser mayor de edad" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataClient.age > 120) {
        response.json({ state: false, mensaje: "El campo edad no debe ser superior de 120" })
        return false
    }

    //para validar que el dato estadoCivil no este vacio, nulo o indefinido
    if (dataClient.status == "" || dataClient.status == null || dataClient.status == undefined) {
        response.json({ state: false, mensaje: "El campo estado civil es obligatorio" })
        return false
    }

    // Entrega el resultado de la validación anterior al modelo, con una respuesta 
    clientsModel.save(dataClient, function (answerSave) {
        if (answerSave.state == true) {
            response.json({ state: true, mensaje: "Se registró correctamente" })
        } else {
            response.json({ state: false, mensaje: "Se presentó un error al registrar" })
        }
    })

}


clientsController.loadAll = function (request, response) {

    // Aquí se llama la funcionalidad del modelo y muestra la respuesta
    clientsModel.loadAll(null, function (answerAll) {
        response.json(answerAll)
    })
}

clientsController.loadIdentification = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataClient = {
        identification: request.body.identification,
    }

    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataClient.identification == "" || dataClient.identification == null || dataClient.identification == undefined) {
        response.json({ state: false, mensaje: "El campo cédula es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataClient.identification.length < 8) {
        response.json({ state: false, mensaje: "El campo cédula debe ser igual o mayor a 8 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataClient.identification.length > 10) {
        response.json({ state: false, mensaje: "El campo cédula no debe ser superior de 10 caracteres" })
        return false
    }

    clientsModel.loadIdentification(dataClient, function (answerLoad) {
        response.json(answerLoad)
    })

}

clientsController.updateIdentification = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataClient = {
        identification: request.body.identification,
        name: request.body.name,
        lastName: request.body.lastName,
        adress: request.body.adress,
        phone: request.body.phone,
        age: request.body.age,
        status: request.body.status
    }

    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataClient.identification == "" || dataClient.identification == null || dataClient.identification == undefined) {
        response.json({ state: false, mensaje: "El campo cédula es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataClient.identification.length < 8) {
        response.json({ state: false, mensaje: "El campo cédula debe ser igual o mayor a 8 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataClient.identification.length > 10) {
        response.json({ state: false, mensaje: "El campo cédula no debe ser superior de 10 caracteres" })
        return false
    }

    //para validar que el dato nombre no este vacio, nulo o indefinido
    if (dataClient.name == "" || dataClient.name == null || dataClient.name == undefined) {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataClient.name.length < 3) {
        response.json({ state: false, mensaje: "El campo nombre debe ser mayor de 3 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataClient.name.length > 20) {
        response.json({ state: false, mensaje: "El campo nombre no debe ser superior de 20 caracteres" })
        return false
    }

    //para validar que el dato apellido no este vacio, nulo o indefinido
    if (dataClient.lastName == "" || dataClient.lastName == null || dataClient.lastName == undefined) {
        response.json({ state: false, mensaje: "El campo apellido es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataClient.lastName.length < 3) {
        response.json({ state: false, mensaje: "El campo apellido debe ser mayor de 3 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataClient.lastName.length > 20) {
        response.json({ state: false, mensaje: "El campo apellido no debe ser superior de 20 caracteres" })
        return false
    }

    //para validar que el dato direccion no este vacio, nulo o indefinido
    if (dataClient.adress == "" || dataClient.adress == null || dataClient.adress == undefined) {
        response.json({ state: false, mensaje: "El campo dirección es obligatorio" })
        return false
    }

    //para validar que el dato telefono no este vacio, nulo o indefinido
    if (dataClient.phone == "" || dataClient.phone == null || dataClient.phone == undefined) {
        response.json({ state: false, mensaje: "El campo teléfono es obligatorio" })
        return false
    }


    //para validar que el dato edad no este vacio, nulo o indefinido
    if (dataClient.age == "" || dataClient.age == null || dataClient.age == undefined) {
        response.json({ state: false, mensaje: "El campo edad es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataClient.age < 18) {
        response.json({ state: false, mensaje: "Para registrarse en nuestra página debe ser mayor de edad" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataClient.age > 120) {
        response.json({ state: false, mensaje: "El campo edad no debe ser superior de 120" })
        return false
    }

    //para validar que el dato estadoCivil no este vacio, nulo o indefinido
    if (dataClient.status == "" || dataClient.status == null || dataClient.status == undefined) {
        response.json({ state: false, mensaje: "El campo estado civil es obligatorio" })
        return false
    }

    clientsModel.updateIdentification(dataClient, function (answerUpdate) {
        if (answerUpdate.state = true) {
            response.json({ state: true, mensaje: "Se actualizó correctamente" })
        } else {
            response.json({ state: false, mensaje: "Se presentó un error al actualizar" })
        }
    })
}

clientsController.delete = function (request, response) {

     //aquí se establecen los datos que recibe el modelo 
     var dataClient = {
        identification: request.body.identification,
    }

    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataClient.identification == "" || dataClient.identification == null || dataClient.identification == undefined) {
        response.json({ state: false, mensaje: "El campo cédula es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataClient.identification.length < 8) {
        response.json({ state: false, mensaje: "El campo cédula debe ser igual o mayor a 8 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataClient.identification.length > 10) {
        response.json({ state: false, mensaje: "El campo cédula no debe ser superior de 10 caracteres" })
        return false
    }

    clientsModel.delete(dataClient,function(answerDelete){
        if(answerDelete.state == true){
            response.json({state:true,mensaje:"Se eliminó correctamente"})
        }else{
            response.json({state:false,mensaje:"Se presentó un error al eliminar"})
        }
    })
}

module.exports.controllerClients = clientsController // para exportar los controladores y que se puedan usar en las rutas