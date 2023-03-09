var clientsController = {} //objeto que contiene los controladores

// vincular el controlador con el modelo
var clientsModel = require(__dirname + '/../Models/clientsModel.js').modelClients
const mongoose = require('mongoose') //para importar mongoose


//funcion para generar numero aleatorio para envio de correo electronico de validación de cuenta
function numAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}



clientsController.save = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataClient = {
        identification: request.body.identification.toString(),
        name: request.body.name,
        lastName: request.body.lastName,
        adress: request.body.adress,
        phone: request.body.phone,
        age: request.body.age,
        status: request.body.status,
        email: request.body.email,
        password: request.body.password, //aqui habia un toString()
        cPassword: request.body.cPassword
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
    if (dataClient.age > 100) {
        response.json({ state: false, mensaje: "El campo edad no debe ser superior de 100" })
        return false
    }

    //para validar que el dato estadoCivil no este vacio, nulo o indefinido
    if (dataClient.status == "" || dataClient.status == null || dataClient.status == undefined) {
        response.json({ state: false, mensaje: "El campo estado civil es obligatorio" })
        return false
    }

    //para validar que el dato estadoCivil se llene de acuerdo a la lista especificada
    if (dataClient.status != "Soltero" && dataClient.status != "Casado" && dataClient.status != "Union libre") {
        response.json({ state: false, mensaje: "Debe seleccionar una opción" })
        return false
    }

    //para validar que el dato email no este vacio, nulo o indefinido
    if (dataClient.email == "" || dataClient.email == null || dataClient.email == undefined) {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    function validarEmail(email) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    }

    if (!validarEmail(dataClient.email)) {
        response.json({ state: false, mensaje: "El email debe contener @ . y dominio." })
        return false
    }

    //para validar que el dato password no este vacio, nulo o indefinido
    if (dataClient.password == "" || dataClient.password == null || dataClient.password == undefined) {
        response.json({ state: false, mensaje: "El campo contraseña es obligatorio" })
        return false
    }

    //para validar que el dato cPassword no este vacio, nulo o indefinido
    if (dataClient.cPassword == "" || dataClient.cPassword == null || dataClient.cPassword == undefined) {
        response.json({ state: false, mensaje: "El campo confirmación contraseña es obligatorio" })
        return false
    }

    function validarContraseña(password) {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        return regex.test(password);
    }

    if (!validarContraseña(dataClient.password)) {
        response.json({ state: false, mensaje: "La contraseña debe ser de mínimo 12 caracteres y debe contener mayúsculas, minúsculas, números y un carácter especial." })
        return false
    }

    //aquí se genera el código aleatorio que se asigna al cliente
    dataClient.codigo = numAleatorio(1000, 9999)

    //paquete necesario para enviar correos "nodemailer"
    //qpaesblbcdhmdhhf

    //importar paquete nodemailer
    const nodemailer = require("nodemailer")

    //crear el transportador, aplicacion que usa nodemailer para configurar el correo y enviarlo
    let transporter = nodemailer.createTransport({
        //configuración
        host: config.host, // se define el host: dominio del servidor de salida de correo en este caso Gmail
        port: config.port,//puerto por el que trabaja el servidor de Gmail
        secure: false, //tiene seguridad ??
        requireTLS: true, //protocolo de seguridad
        auth: {
            user: config.user, // direccion de correo de donde salen los emails
            pass: config.pass // password que generó la configuración del correo
        },
        tls: {
            rejectUnauthorized: false //funciona sin este parametro
        }
    })

    // configuración de la información que contiene el email
    let mailOptions = {
        from: config.user, // de que direccion email sale el correo
        to: dataClient.email, //para quien va el correo, correo del cliente
        subject: "Verifica tu cuenta" + dataClient.codigo,
        html: "<div style='color:red'>Hola! Por favor activa tu cuenta en el siguiente enlace <a href='http://localhost:3000/activar/"+ dataClient.email +"/"+ dataClient.codigo +"'>Clic aqui</a></div>" //mensaje del correo en html
    }

    //enviar email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            response.json(error)
        }
        else {
            console.log(info)
            //Entrega el resultado de la validación anterior al modelo, con una respuesta
            clientsModel.save(dataClient, function (answerSave) {

                if (answerSave.state == true) {
                    response.json({ state: true, mensaje: answerSave.mensaje })
                } else {
                    response.json({ state: false, mensaje: answerSave.mensaje })
                }
            })
        }
    })




}


clientsController.loadAll = function (request, response) {

    // Aquí se llama la funcionalidad del modelo y muestra la respuesta
    clientsModel.loadAll(null, function (answerLoadA) {

        response.json(answerLoadA)
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

    clientsModel.loadIdentification(dataClient, function (answerLoadI) {

        response.json(answerLoadI)
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
        status: request.body.status,
        email: request.body.email,
        password: request.body.password,
        cPassword: request.body.cPassword
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

    //para validar que el dato estadoCivil no este vacio, nulo o indefinido
    if (dataClient.status != "Soltero" && dataClient.status != "Casado" && dataClient.status != "Unión libre") {
        response.json({ state: false, mensaje: "Debe escribir las opciones Soltero, Casado o Unión libre" })
        return false
    }

    //para validar que el dato email no este vacio, nulo o indefinido
    if (dataClient.email == "" || dataClient.email == null || dataClient.email == undefined) {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    function validarEmail(email) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    }

    if (!validarEmail(dataClient.email)) {
        response.json({ state: false, mensaje: "El email debe contener @ . y dominio." })
        return false
    }

    //para validar que el dato password no este vacio, nulo o indefinido
    if (dataClient.password == "" || dataClient.password == null || dataClient.password == undefined) {
        response.json({ state: false, mensaje: "El campo contraseña es obligatorio" })
        return false
    }

    //para validar que el dato cPassword no este vacio, nulo o indefinido
    if (dataClient.cPassword == "" || dataClient.cPassword == null || dataClient.cPassword == undefined) {
        response.json({ state: false, mensaje: "El campo confirmación contraseña es obligatorio" })
        return false
    }

    function validarContraseña(password) {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        return regex.test(password);
    }

    if (!validarContraseña(dataClient.password)) {
        response.json({ state: false, mensaje: "La contraseña debe ser de mínimo 12 caracteres y debe contener mayúsculas, minúsculas, números y un carácter especial." })
        return false
    }
    clientsModel.updateIdentification(dataClient, function (answerUpdate) {

        if (answerUpdate.state = true) {
            response.json({ state: true, mensaje: answerUpdate.mensaje })
        } else {
            response.json({ state: false, mensaje: answerUpdate.mensaje })
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

    clientsModel.delete(dataClient, function (answerDelete) {

        if (answerDelete.state == true) {
            response.json({ state: true, mensaje: answerDelete.mensaje })
        } else {
            response.json({ state: false, mensaje: answerDelete.mensaje })
        }
    })
}

clientsController.Login = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataClient = {
        email: request.body.email,
        password: request.body.password,
    }

    //validaciones de los datos que esta recibiendo el controlador

    //para validar que el dato cedula no este vacio, nulo o indefinido
    if (dataClient.email == "" || dataClient.email == null || dataClient.email == undefined) {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    if (dataClient.password == "" || dataClient.password == null || dataClient.password == undefined) {
        response.json({ state: false, mensaje: "El campo password es obligatorio" })
        return false
    }

    //funcion que trae el estado de la busqueda del modelo, si el resultado de la busqueda es 0 genera un mensaje, si es 1 le permite loguearse

    clientsModel.validarEstadoCliente(dataClient, function (answerState) {
        if (answerState.mensaje[0].estado == 0) {
            response.json({ state: false, mensaje: "Tiene pendiente activar su cuenta, por favor revise su email" })
        }
        else {
            clientsModel.Login(dataClient, function (answerLoadL) {

                if (answerLoadL.state == true) {

                    //datos que se almacenan en la sesion al hacer login correcto
                    request.session.nombre = answerLoadL.mensaje[0].name
                    request.session.rol = answerLoadL.mensaje[0].rol
                    request.session._id = answerLoadL.mensaje[0]._id

                    response.json({ state: true, mensaje: "Bienvenido Cliente" })
                }
                else {
                    response.json({ state: false, mensaje: "Usuario o contraseña invalido cliente" })
                }
            })

        }
    })



}

clientsController.Activar = function (request, response) {

    //aquí se establecen los datos que recibe el modelo 
    var dataClient = {
        email: request.params.email,
        codigo: request.params.codigo,
    }

    //para validar que el dato email no este vacio, nulo o indefinido
    if (dataClient.email == "" || dataClient.email == null || dataClient.email == undefined) {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    function validarEmail(email) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    }

    if (!validarEmail(dataClient.email)) {
        response.json({ state: false, mensaje: "El email debe contener @ . y dominio." })
        return false
    }

    //para validar que el dato codigo no este vacio, nulo o indefinido
    if (dataClient.codigo == "" || dataClient.codigo == null || dataClient.codigo == undefined) {
        response.json({ state: false, mensaje: "El campo codigo es obligatorio" })
        return false
    }

    clientsModel.Activar(dataClient, function (verEstado) {
        if(verEstado.mensaje.length == 0){
            response.json({state:false, mensaje:"El email o el código son invalidos"})
        }
        else{
            if(verEstado.mensaje[0].estado == 1){
                response.json({state:true, mensaje: "La cuenta ya está activada"})
            }
            else{
                dataClient.id = verEstado.mensaje[0]._id
                clientsModel.actualizarEstado(dataClient, function(answerActivate){
                    if(answerActivate.state == true){
                        response.json({state:true, mensaje:"Cuenta activada correctamente"})
                    }
                    else{
                        response.json({state:false, mensaje:"Se presentó un error al activar"})
                    }
                })
            }
        }
    })
}
module.exports.controllerClients = clientsController // para exportar los controladores y que se puedan usar en las rutas