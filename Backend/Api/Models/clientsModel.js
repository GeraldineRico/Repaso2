var clientsModel = {} // objeto que contiene los modelos
const mongoose = require('mongoose') //para importar mongoose

//se crea el esquema de mongo
const Schema = mongoose.Schema;

//se definen los tipos que tiene el esquema
var clientsSchema = new Schema({

    id: String,
    identification: {
        type: Number,
        unique: true, //Para que el campo no se pueda repetir
        require: true
    },
    name: String,
    lastName: String,
    adress: String,
    phone: Number,
    age: Number,
    status: {
        type: String,
        enum: ["Soltero", "Casado", "Unión libre"] //lista de opciones que debe recibir el campo
    },
    email: String,
    password: String,
    cPassword: String,
    rol: Number,
    estado: Number,
    codigo: String
})

//se crea la coleccion en la base de datos y se le asigna el esquema 
const cModel = mongoose.model('clients', clientsSchema)


// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
clientsModel.save = function (dataClient, callback) {
    //primero se valida si existe la cédula, en caso contrario continua con el guardado
    cModel.findOne({ identification: dataClient.identification }, (error, result) => {
        if (error) {
            return callback({ state: false, mensaje: error })
        }
        if (result) {
            return callback({ state: false, mensaje: "La cédula ya existe" })
        } else {

            //se establece que este documento se guarda en la colección "clients"
            const instancia = new cModel
            instancia.identification = dataClient.identification
            instancia.name = dataClient.name
            instancia.lastName = dataClient.lastName
            instancia.adress = dataClient.adress
            instancia.phone = dataClient.phone
            instancia.age = dataClient.age
            instancia.status = dataClient.status
            instancia.email = dataClient.email
            instancia.password = dataClient.password
            instancia.cPassword = dataClient.cPassword
            instancia.rol = "2"
            instancia.estado = "0" // estado 0 inactivo 1 activo para envio de correo de validación de cuenta
            instancia.codigo = dataClient.codigo // este codigo se crea en backend y viene desde el controlador

            //para guardar, si genera false muestra el mensaje false del controlador, si genera true muestra el mensaje true del controlador 
            instancia.save((error, created) => {
                if (error) {
                    return callback({ state: false, mensaje: error })
                }
                else {
                    return callback({ state: true, mensaje: "Cliente guardado correctamente" })
                }
            })

        }
    })

}

// en este caso el modelo no recibe datos ya que solamente los debe cargar lo que se guardo, por eso queda Null y retorna un callback "respuesta" al controlador
clientsModel.loadAll = function (dataClient, callback) {

    cModel.find({}, { _id: 1, identification: 1, name: 1, lastName: 1, phone: 1, age:1, email:1, adress:1 }, (error, answerLoadA) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true, mensaje: answerLoadA })
        }
    })

}

// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
clientsModel.loadIdentification = function (dataClient, callback) {

    //buscar la id
    cModel.findById(dataClient.id, {}, (error, answerLoadI) => {
        if (error) {
            return callback({ state: false, mensaje: error })
        }
        else {
            return callback({ state: true, mensaje: answerLoadI })
        }
    })


}

// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
clientsModel.updateIdentification = function (dataClient, callback) {

    cModel.findByIdAndUpdate(dataClient.id, {
        name: dataClient.name,
        lastName: dataClient.lastName,
        adress: dataClient.adress,
        phone: dataClient.phone,
        age: dataClient.age,
        status: dataClient.status,
        email: dataClient.email,
        password: dataClient.password,
        cPassword: dataClient.cPassword
    }, (error,modified) =>{
        if(error){
            return callback ({state: false, mensaje:error})
        }
        else{
            return callback ({state: true, mensaje: "Datos actualizados correctamente"})
        }
    })

    /* cModel.find({ identification: dataClient.identification }, {}, (error, answerUpdate) => {
        if (error) {
            return callback({ state: false, mensaje: error })
        }
        else {
            if (answerUpdate.length > 0) {
                cModel.findByIdAndUpdate(answerUpdate[0]._id,
                    {
                        name: dataClient.name,
                        lastName: dataClient.lastName,
                        adress: dataClient.adress,
                        phone: dataClient.phone,
                        age: dataClient.age,
                        status: dataClient.status,
                        email: dataClient.email,
                        password: dataClient.password,
                        cPassword: dataClient.cPassword

                    }, (error, modified) => {
                        if (error) {
                            return callback({ state: false, mensaje:error })
                        }
                        else {
                            return callback({ state: true, mensaje:"Cliente actualizado correctamente"})
                        }
                    })
            } else {
                return callback({ state: false, mensaje:"No se encontró la cédula"})
            }
        }
    }) */
}

// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
clientsModel.delete = function (dataClient, callback) {

    cModel.findByIdAndDelete(dataClient.id,(error,answerDelete) =>{
        if(error){
            return callback({state: false, mensaje:error})
        }
        else{
            return callback({state: true, mensaje: "Datos del cliente borrados"})
        }
    })

    /* cModel.find({ identification: dataClient.identification }, {}, (error, answerDelete) => {
        if (error) {
            return callback({ state: false, mensaje: error })
        }
        else {
            if (answerDelete.length > 0) {
                cModel.findByIdAndDelete(answerDelete[0]._id, (error, deleted) => {
                    if (error) {
                        return callback({ state: false, mensaje: error })
                    }
                    else {
                        return callback({ state: true, mensaje: "Cliente borrado" })
                    }
                })
            } else {
                return callback({ state: false, mensaje: "No se encontró la cédula" })
            }
        }
    }) */
}

clientsModel.Login = function (dataClient, callback) {

    //buscar email y password
    cModel.find({ email: dataClient.email, password: dataClient.password }, { name: 1, rol: 2 }, (error, answerLoadL) => {
        if (error) {
            return callback({ state: false, mensaje: error })
        }
        else {
            if (answerLoadL.length == 0) {
                return callback({ state: false, mensaje: "Datos invalidos" })
            } else {
                return callback({ state: true, mensaje: answerLoadL })
            }

        }
    })


}

// funcion que valida el estado del cliente 0 inactivo o 1 activo
clientsModel.validarEstadoCliente = function (dataClient, callback) {

    //buscar el email y muestra el estado 0 o 1 para indicar al usuario si debe validar la cuenta o no
    cModel.find({ email: dataClient.email }, { estado: 1 }, (error, answerState) => {
        if (error) {
            return callback({ state: false, mensaje: error })
        }
        else {
            return callback({ state: true, mensaje: answerState })
        }
    })


}

clientsModel.Activar = function (dataClient, callback) {

    //buscar el email y codigo
    cModel.find({ email: dataClient.email, codigo: dataClient.codigo }, { estado: 1 }, (error, answerState) => {
        if (error) {
            return callback({ state: false, mensaje: error })
        }
        else {
            return callback({ state: true, mensaje: answerState })
        }
    })


}

clientsModel.actualizarEstado = function (dataClient, callback) {

    cModel.findByIdAndUpdate(dataClient.id, {
        estado: 1,
    }, (error, modificado) => {
        if (error) {
            return callback({ state: false, mensaje: error })
        }
        else {
            return callback({ state: true })
        }
    })
}

module.exports.modelClients = clientsModel // para exportar los modelos y que se puedan usar en los controladores