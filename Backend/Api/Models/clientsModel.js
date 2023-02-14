var clientsModel = {} // objeto que contiene los modelos
const mongoose = require('mongoose') //para importar mongoose

//se crea el esquema de mongo
const Schema = mongoose.Schema;

//se definen los tipos que tiene el esquema
var clientsSchema = new Schema({

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
    email:String,
    password:String,
    cPassword:String

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

    cModel.find({}, { _id: 0, identification: 1, name: 1, lastName: 1, phone: 1 }, (error, answerLoadA) => {
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

    //buscar la cédula
    cModel.find({ identification: dataClient.identification }, {}, (error, answerLoadI) => {
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

    cModel.find({ identification: dataClient.identification }, {}, (error, answerUpdate) => {
        if (error) {
            return callback({ state: false, mensaje: error })
        }
        else {
            if (answerUpdate.length > 0) {
                cModel.findByIdAndUpdate(answerUpdate[0]._id,
                    {
                        identification: dataClient.identification,
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
    })
}

// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
clientsModel.delete = function (dataClient, callback) {

    cModel.find({ identification: dataClient.identification }, {}, (error, answerDelete) => {
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
                        return callback({ state: true, mensaje:"Cliente borrado"})
                    }
                })
            } else {
                return callback({ state: false, mensaje:"No se encontró la cédula" })
            }
        }
    })
}

module.exports.modelClients = clientsModel // para exportar los modelos y que se puedan usar en los controladores