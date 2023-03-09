var adminsController = {} //objeto que contiene los controladores

// vincular el controlador con el modelo
var adminsModel = require(__dirname + '/../Models/adminsModel.js').modelAdmins
const mongoose = require('mongoose') //para importar mongoose


adminsController.save = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataAdmin = {
        identification: request.body.identification,
        name: request.body.name,
        lastName: request.body.lastName,
        adress: request.body.adress,
        phone: request.body.phone,
        age: request.body.age,
        status: request.body.status,
        email: request.body.email,
        password: request.body.password,
        cPassword: request.body.cPassword
    }
    
    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataAdmin.identification == "" || dataAdmin.identification == null || dataAdmin.identification == undefined) {
        response.json({ state: false, mensaje: "El campo cédula es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataAdmin.identification.length < 8) {
        response.json({ state: false, mensaje: "El campo cédula debe ser igual o mayor a 8 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataAdmin.identification.length > 10) {
        response.json({ state: false, mensaje: "El campo cédula no debe ser superior de 10 caracteres" })
        return false
    }

    //para validar que el dato nombre no este vacio, nulo o indefinido
    if (dataAdmin.name == "" || dataAdmin.name == null || dataAdmin.name == undefined) {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataAdmin.name.length < 3) {
        response.json({ state: false, mensaje: "El campo nombre debe ser mayor de 3 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataAdmin.name.length > 20) {
        response.json({ state: false, mensaje: "El campo nombre no debe ser superior de 20 caracteres" })
        return false
    }

    //para validar que el dato apellido no este vacio, nulo o indefinido
    if (dataAdmin.lastName == "" || dataAdmin.lastName == null || dataAdmin.lastName == undefined) {
        response.json({ state: false, mensaje: "El campo apellido es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataAdmin.lastName.length < 3) {
        response.json({ state: false, mensaje: "El campo apellido debe ser mayor de 3 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataAdmin.lastName.length > 20) {
        response.json({ state: false, mensaje: "El campo apellido no debe ser superior de 20 caracteres" })
        return false
    }

    //para validar que el dato direccion no este vacio, nulo o indefinido
    if (dataAdmin.adress == "" || dataAdmin.adress == null || dataAdmin.adress == undefined) {
        response.json({ state: false, mensaje: "El campo dirección es obligatorio" })
        return false
    }

    //para validar que el dato telefono no este vacio, nulo o indefinido
    if (dataAdmin.phone == "" || dataAdmin.phone == null || dataAdmin.phone == undefined) {
        response.json({ state: false, mensaje: "El campo teléfono es obligatorio" })
        return false
    }


    //para validar que el dato edad no este vacio, nulo o indefinido
    if (dataAdmin.age == "" || dataAdmin.age == null || dataAdmin.age == undefined) {
        response.json({ state: false, mensaje: "El campo edad es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataAdmin.age < 18) {
        response.json({ state: false, mensaje: "Para registrarse en nuestra página debe ser mayor de edad" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataAdmin.age > 100) {
        response.json({ state: false, mensaje: "El campo edad no debe ser superior de 100" })
        return false
    }

    //para validar que el dato estadoCivil no este vacio, nulo o indefinido
    if (dataAdmin.status == "" || dataAdmin.status == null || dataAdmin.status == undefined) {
        response.json({ state: false, mensaje: "El campo estado civil es obligatorio" })
        return false
    }

    //para validar que el dato estadoCivil se llene de acuerdo a la lista especificada
    if (dataAdmin.status != "Soltero" && dataAdmin.status != "Casado" && dataAdmin.status != "Union libre") {
        response.json({ state: false, mensaje: "Debe seleccionar una opción" })
        return false
    }

    //para validar que el dato email no este vacio, nulo o indefinido
    if (dataAdmin.email == "" || dataAdmin.email == null || dataAdmin.email == undefined) {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    function validarEmail(email) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    }

    if (!validarEmail(dataAdmin.email)) {
        response.json({ state: false, mensaje: "El email debe contener @ . y dominio." })
        return false
    }

    //para validar que el dato password no este vacio, nulo o indefinido
    if (dataAdmin.password == "" || dataAdmin.password == null || dataAdmin.password == undefined) {
        response.json({ state: false, mensaje: "El campo contraseña es obligatorio" })
        return false
    }

    //para validar que el dato cPassword no este vacio, nulo o indefinido
    if (dataAdmin.cPassword == "" || dataAdmin.cPassword == null || dataAdmin.cPassword == undefined) {
        response.json({ state: false, mensaje: "El campo confirmación contraseña es obligatorio" })
        return false
    }

    function validarContraseña(password) {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        return regex.test(password);
    }

    if (!validarContraseña(dataAdmin.password)) {
        response.json({ state: false, mensaje: "La contraseña debe ser de mínimo 12 caracteres y debe contener mayúsculas, minúsculas, números y un carácter especial." })
        return false
    }

    // Entrega el resultado de la validación anterior al modelo, con una respuesta 
    adminsModel.save(dataAdmin, function (answerSave) {

        if (answerSave.state == true) {
            response.json({ state: true, mensaje: answerSave.mensaje })
        } else {
            response.json({ state: false, mensaje: answerSave.mensaje })
        }
    })

}


adminsController.loadAll = function (request, response) {

    // Aquí se llama la funcionalidad del modelo y muestra la respuesta
    adminsModel.loadAll(null, function (answerLoadA) {

        response.json(answerLoadA)
    })
}

adminsController.loadIdentification = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataAdmin = {
        id: request.body.id,
    }

    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataAdmin.id == "" || dataAdmin.id == null || dataAdmin.id == undefined) {
        response.json({ state: false, mensaje: "El campo id del admin es obligatorio" })
        return false
    }

    adminsModel.loadIdentification(dataAdmin, function (answerLoadI) {

        response.json(answerLoadI)
    })

}

adminsController.updateIdentification = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataAdmin = {
        id: request.body.id,
        identification: request.body.identification,
        name: request.body.name,
        lastName: request.body.lastName,
        adress: request.body.adress,
        phone: request.body.phone,
        age: request.body.age,
        status: request.body.status,
        email: request.body.email,
        password: request.body.password,
        cPassword: request.body.cPassword
    }

    //validaciones de los datos que esta recibiendo el controlador

    if (dataAdmin.id == "" || dataAdmin.id == null || dataAdmin.id == undefined) {
        response.json({ state: false, mensaje: "El campo id del admin es obligatorio" })
        return false
    }

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataAdmin.identification == "" || dataAdmin.identification == null || dataAdmin.identification == undefined) {
        response.json({ state: false, mensaje: "El campo cédula es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataAdmin.identification.length < 8) {
        response.json({ state: false, mensaje: "El campo cédula debe ser igual o mayor a 8 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataAdmin.identification.length > 10) {
        response.json({ state: false, mensaje: "El campo cédula no debe ser superior de 10 caracteres" })
        return false
    }

    //para validar que el dato nombre no este vacio, nulo o indefinido
    if (dataAdmin.name == "" || dataAdmin.name == null || dataAdmin.name == undefined) {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataAdmin.name.length < 3) {
        response.json({ state: false, mensaje: "El campo nombre debe ser mayor de 3 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataAdmin.name.length > 20) {
        response.json({ state: false, mensaje: "El campo nombre no debe ser superior de 20 caracteres" })
        return false
    }

    //para validar que el dato apellido no este vacio, nulo o indefinido
    if (dataAdmin.lastName == "" || dataAdmin.lastName == null || dataAdmin.lastName == undefined) {
        response.json({ state: false, mensaje: "El campo apellido es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataAdmin.lastName.length < 3) {
        response.json({ state: false, mensaje: "El campo apellido debe ser mayor de 3 caracteres" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataAdmin.lastName.length > 20) {
        response.json({ state: false, mensaje: "El campo apellido no debe ser superior de 20 caracteres" })
        return false
    }

    //para validar que el dato direccion no este vacio, nulo o indefinido
    if (dataAdmin.adress == "" || dataAdmin.adress == null || dataAdmin.adress == undefined) {
        response.json({ state: false, mensaje: "El campo dirección es obligatorio" })
        return false
    }

    //para validar que el dato telefono no este vacio, nulo o indefinido
    if (dataAdmin.phone == "" || dataAdmin.phone == null || dataAdmin.phone == undefined) {
        response.json({ state: false, mensaje: "El campo teléfono es obligatorio" })
        return false
    }


    //para validar que el dato edad no este vacio, nulo o indefinido
    if (dataAdmin.age == "" || dataAdmin.age == null || dataAdmin.age == undefined) {
        response.json({ state: false, mensaje: "El campo edad es obligatorio" })
        return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (dataAdmin.age < 18) {
        response.json({ state: false, mensaje: "Para registrarse en nuestra página debe ser mayor de edad" })
        return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (dataAdmin.age > 120) {
        response.json({ state: false, mensaje: "El campo edad no debe ser superior de 120" })
        return false
    }

    //para validar que el dato estadoCivil no este vacio, nulo o indefinido
    if (dataAdmin.status == "" || dataAdmin.status == null || dataAdmin.status == undefined) {
        response.json({ state: false, mensaje: "El campo estado civil es obligatorio" })
        return false
    }

    //para validar que el dato estadoCivil no este vacio, nulo o indefinido
    if (dataAdmin.status != "Soltero" && dataAdmin.status != "Casado" && dataAdmin.status != "Unión libre") {
        response.json({ state: false, mensaje: "Debe escribir las opciones Soltero, Casado o Unión libre" })
        return false
    }

    //para validar que el dato email no este vacio, nulo o indefinido
    if (dataAdmin.email == "" || dataAdmin.email == null || dataAdmin.email == undefined) {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    function validarEmail(email) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    }

    if (!validarEmail(dataAdmin.email)) {
        response.json({ state: false, mensaje: "El email debe contener @ . y dominio." })
        return false
    }

    //para validar que el dato password no este vacio, nulo o indefinido
    if (dataAdmin.password == "" || dataAdmin.password == null || dataAdmin.password == undefined) {
        response.json({ state: false, mensaje: "El campo contraseña es obligatorio" })
        return false
    }

    //para validar que el dato cPassword no este vacio, nulo o indefinido
    if (dataAdmin.cPassword == "" || dataAdmin.cPassword == null || dataAdmin.cPassword == undefined) {
        response.json({ state: false, mensaje: "El campo confirmación contraseña es obligatorio" })
        return false
    }

    function validarContraseña(password) {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        return regex.test(password);
    }

    if (!validarContraseña(dataAdmin.password)) {
        response.json({ state: false, mensaje: "La contraseña debe ser de mínimo 12 caracteres y debe contener mayúsculas, minúsculas, números y un carácter especial." })
        return false
    }
    adminsModel.updateIdentification(dataAdmin, function (answerUpdate) {

        if (answerUpdate.state = true) {
            response.json({ state: true, mensaje: answerUpdate.mensaje })
        } else {
            response.json({ state: false, mensaje: answerUpdate.mensaje })
        }
    })
}

adminsController.delete = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataAdmin = {
        id: request.body.id,
    }

    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataAdmin.id == "" || dataAdmin.id == null || dataAdmin.id == undefined) {
        response.json({ state: false, mensaje: "El campo id del admin es obligatorio" })
        return false
    }

    adminsModel.delete(dataAdmin, function (answerDelete) {

        if (answerDelete.state == true) {
            response.json({ state: true, mensaje: answerDelete.mensaje })
        } else {
            response.json({ state: false, mensaje: answerDelete.mensaje })
        }
    })
}

adminsController.Login = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataAdmin = {
        email: request.body.email,
        password: request.body.password,
    }
    console.log(dataAdmin)
    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataAdmin.email == "" || dataAdmin.email == null || dataAdmin.email == undefined) {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    if (dataAdmin.password == "" || dataAdmin.password == null || dataAdmin.password == undefined) {
        response.json({ state: false, mensaje: "El campo password es obligatorio" })
        return false
    }

    adminsModel.Login(dataAdmin, function (answerLoadL) {
        if(answerLoadL.state == true){

            //datos que se almacenan en la sesion al hacer login correcto
            request.session.nombre = answerLoadL.mensaje[0].name
            request.session.rol = answerLoadL.mensaje[0].rol
            request.session._id = answerLoadL.mensaje[0]._id
            
            response.json({state:true, mensaje:"Bienvenido Admin"})
        }
        else{
            response.json({state:false, mensaje:"Usuario o contraseña invalido"})
        }
    })

}

//AQUI VA ACTIVAR CUENTA DE ADMINS


module.exports.controllerAdmins = adminsController // para exportar los controladores y que se puedan usar en las rutas