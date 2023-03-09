var categoriesModel = {} // objeto que contiene los modelos
const mongoose = require('mongoose') //para importar mongoose

//se crea el esquema de mongo
const Schema = mongoose.Schema;

//se definen los tipos que tiene el esquema
var categoriesSchema = new Schema({

    id: String,
    code: Number,
    nameCategories: String,
    detail: String

})

//se crea la coleccion en la base de datos y se le asigna el esquema 
const pModel = mongoose.model('categories', categoriesSchema)


// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
categoriesModel.save = function (dataCategories, callback) {

    //se establece que este documento se guarda en la colección "products"
    const instancia = new pModel
    instancia.code = dataCategories.code
    instancia.nameCategories = dataCategories.nameCategories
    instancia.detail = dataCategories.detail

    //para guardar, si genera false muestra el mensaje false del controlador, si genera true muestra el mensaje true del controlador 
    instancia.save((error, created) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true })
        }
    })

}

// en este caso el modelo no recibe datos ya que solamente los debe cargar lo que se guardo, por eso queda Null y retorna un callback "respuesta" al controlador
categoriesModel.loadAll = function (dataCategories, callback) {

    pModel.find({}, { _id: 1, code: 1, nameCategories: 1, detail: 1 }, (error, answerData) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true, data: answerData })
        }
    })

}

// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
categoriesModel.loadIdentification = function (dataCategories, callback) {

    //buscar id
    pModel.findById(dataCategories.id, {}, (error, answerData) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true, data: answerData })
        }
    })


}

// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
categoriesModel.updateIdentification = function (dataCategories, callback) {

    pModel.findByIdAndUpdate(dataCategories.id,{
        code: dataCategories.code,
        nameCategories: dataCategories.nameCategories,
        detail: dataCategories.detail
    }, (error,modificado) =>{
        if(error){
            return callback ({state: false, mensaje: error})
        }
        else{
            return callback ({state: true})
        }
    })

    // pModel.find({ code: dataCategories.code }, {}, (error, answerData) => {
    //     if (error) {
    //         return callback({ state: false, mensaje: error })
    //     }
    //     else {
    //         if (answerData.length > 0) {
    //             pModel.findByIdAndUpdate(answerData[0]._id,
    //                 {
    //                     code: dataCategories.code,
    //                     nameCategories: dataCategories.nameCategories,
    //                     
    //                 }, (error, modified) => {
    //                     if (error) {
    //                         return callback({ state: false, mensaje: error })
    //                     }
    //                     else {
    //                         return callback({ state: true })
    //                     }
    //                 })
    //         } else {
    //             return callback({ state: false })
    //         }
    //     }
    // })
}

// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
categoriesModel.delete = function (dataCategories, callback) {

    pModel.findByIdAndDelete(dataCategories.id,(error,answerData) =>{
        if(error){
            return callback({state: false, mensaje: error})
        }
        else{
            return callback({state: true})
        }
    })




    // pModel.find({ code: dataCategories.code }, {}, (error, answerData) => {
    //     if (error) {
    //         return callback({ state: false, mensaje: error })
    //     }
    //     else {
    //         if (answerData.length > 0) {
    //             pModel.findByIdAndDelete(answerData[0]._id, (error, deleted) => {
    //                 if (error) {
    //                     return callback({ state: false, mensaje: error })
    //                 }
    //                 else {
    //                     return callback({ state: true })
    //                 }
    //             })
    //         } else {
    //             return callback({ state: false })
    //         }
    //     }
    // })
}

module.exports.modelCategories = categoriesModel // para exportar los modelos y que se puedan usar en los controladores