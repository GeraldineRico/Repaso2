var adminsModel = {} // objeto que contiene los modelos
const mongoose = require('mongoose') //para importar mongoose

//se crea el esquema de mongo
const Schema = mongoose.Schema;

//se definen los tipos que tiene el esquema
var adminsSchema = new Schema({

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
    rol: Number

})

//se crea la coleccion en la base de datos y se le asigna el esquema 
const aModel = mongoose.model('admins', adminsSchema)


// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
adminsModel.save = function (dataAdmin, callback) {
    //primero se valida si existe la cédula, en caso contrario continua con el guardado
    aModel.findOne({ identification: dataAdmin.identification }, (error, result) => {
        if (error) {
            return callback({ state: false, mensaje: error })
        }
        if (result) {
            return callback({ state: false, mensaje: "La cédula ya existe" })
        } else {

            //se establece que este documento se guarda en la colección "clients"
            const instancia = new aModel
            instancia.identification = dataAdmin.identification
            instancia.name = dataAdmin.name
            instancia.lastName = dataAdmin.lastName
            instancia.adress = dataAdmin.adress
            instancia.phone = dataAdmin.phone
            instancia.age = dataAdmin.age
            instancia.status = dataAdmin.status
            instancia.email = dataAdmin.email
            instancia.password = dataAdmin.password
            instancia.cPassword = dataAdmin.cPassword
            instancia.rol = "1"
            //para guardar, si genera false muestra el mensaje false del controlador, si genera true muestra el mensaje true del controlador 
            instancia.save((error, created) => {
                if (error) {
                    return callback({ state: false, mensaje: error })
                }
                else {
                    return callback({ state: true, mensaje: "Administrador guardado correctamente" })
                }
            })

        }
    })

}

// en este caso el modelo no recibe datos ya que solamente los debe cargar lo que se guardo, por eso queda Null y retorna un callback "respuesta" al controlador
adminsModel.loadAll = function (dataAdmin, callback) {

    aModel.find({}, { _id: 1, identification: 1, name: 1, lastName: 1, phone: 1, age: 1, email: 1, rol: 1 }, (error, answerLoadA) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true, mensaje: answerLoadA })
        }
    })

}

// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
adminsModel.loadIdentification = function (dataAdmin, callback) {

    //buscar la cédula
    aModel.findById(dataAdmin.id, {}, (error, answerLoadI) => {
        if (error) {
            return callback({ state: false, mensaje: error })
        } else {
            return callback({ state: true, mensaje: answerLoadI })
        }
    })


    // aModel.find({ identification: dataAdmin.identification }, {}, (error, answerLoadI) => {
    //     if (error) {
    //         return callback({ state: false, mensaje: error })
    //     }
    //     else {
    //         return callback({ state: true, mensaje: answerLoadI })
    //     }
    // })


}

// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
adminsModel.updateIdentification = function (dataAdmin, callback) {

    aModel.findByIdAndUpdate(dataAdmin.id, {
        name: dataAdmin.name,
        lastName: dataAdmin.lastName,
        adress: dataAdmin.adress,
        phone: dataAdmin.phone,
        age: dataAdmin.age,
        status: dataAdmin.status,
        email: dataAdmin.email,
        password: dataAdmin.password,
        cPassword: dataAdmin.cPassword
    }, (error,modified) =>{
        if(error){
            return callback ({state: false, mensaje:error})
        }
        else{
            return callback({ state: true, mensaje: "Datos actualizados correctamente" })
        }
    } )

    /* aModel.find({ identification: dataAdmin.identification }, {}, (error, answerUpdate) => {
        if (error) {
            return callback({ state: false, mensaje: error })
        }
        else {
            if (answerUpdate.length > 0) {
                aModel.findByIdAndUpdate(answerUpdate[0]._id,
                    {
                        name: dataAdmin.name,
                        lastName: dataAdmin.lastName,
                        adress: dataAdmin.adress,
                        phone: dataAdmin.phone,
                        age: dataAdmin.age,
                        status: dataAdmin.status,
                        email: dataAdmin.email,
                        password: dataAdmin.password,
                        cPassword: dataAdmin.cPassword

                    }, (error, modified) => {
                        if (error) {
                            return callback({ state: false, mensaje: error })
                        }
                        else {
                            return callback({ state: true, mensaje: "Administrador actualizado correctamente" })
                        }
                    })
            } else {
                return callback({ state: false, mensaje: "No se encontró la cédula" })
            }
        }
    }) */
}

// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
adminsModel.delete = function (dataAdmin, callback) {

    aModel.findByIdAndDelete(dataAdmin.id,(error,answerDelete) =>{
        if(error){
            return callback({state:false, mensaje:error})
        }
        else{
            return callback({state:true, mensaje:"Datos del admin borrados"})
        }
    })

   /*  aModel.find({ identification: dataAdmin.identification }, {}, (error, answerDelete) => {
        if (error) {
            return callback({ state: false, mensaje: error })
        }
        else {
            if (answerDelete.length > 0) {
                aModel.findByIdAndDelete(answerDelete[0]._id, (error, deleted) => {
                    if (error) {
                        return callback({ state: false, mensaje: error })
                    }
                    else {
                        return callback({ state: true, mensaje: "Administrador borrado" })
                    }
                })
            } else {
                return callback({ state: false, mensaje: "No se encontró la cédula" })
            }
        }
    }) */
}

adminsModel.Login = function (dataAdmin, callback) {

    //buscar email y password
    aModel.find({ email: dataAdmin.email, password: dataAdmin.password }, { name: 1, rol: 1 }, (error, answerLoadL) => {
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

module.exports.modelAdmins = adminsModel // para exportar los modelos y que se puedan usar en los controladores