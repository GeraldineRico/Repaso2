var productsModel = {} // objeto que contiene los modelos
const mongoose = require('mongoose') //para importar mongoose

//se crea el esquema de mongo
const Schema = mongoose.Schema;

//se definen los tipos que tiene el esquema
var productsSchema = new Schema({

    id: String,
    code: Number,
    nameProduct: String,
    price: String

})

//se crea la coleccion en la base de datos y se le asigna el esquema 
const pModel = mongoose.model('products', productsSchema)


// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
productsModel.save = function (dataProduct, callback) {

    //se establece que este documento se guarda en la colección "products"
    const instancia = new pModel
    instancia.code = dataProduct.code
    instancia.nameProduct = dataProduct.nameProduct
    instancia.price = dataProduct.price

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
productsModel.loadAll = function (dataProduct, callback) {

    pModel.find({}, { _id: 1, code: 1, nameProduct: 1, price: 1 }, (error, answerData) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true, data: answerData })
        }
    })

}

// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
productsModel.loadIdentification = function (dataProduct, callback) {

    //buscar id
    pModel.findById(dataProduct.id, {}, (error, answerData) => {
        if (error) {
            return callback({ state: false, data: error })
        }
        else {
            return callback({ state: true, data: answerData })
        }
    })


}

// el modelo recibe los datos del controlador por medio del post, el modelo los procesa y retorna un callback "respuesta" al controlador
productsModel.updateIdentification = function (dataProduct, callback) {

    pModel.findByIdAndUpdate(dataProduct.id,{
        code: dataProduct.code,
        nameProduct: dataProduct.nameProduct,
        price: dataProduct.price
    }, (error,modificado) =>{
        if(error){
            return callback ({state: false, mensaje: error})
        }
        else{
            return callback ({state: true})
        }
    })

    // pModel.find({ code: dataProduct.code }, {}, (error, answerData) => {
    //     if (error) {
    //         return callback({ state: false, mensaje: error })
    //     }
    //     else {
    //         if (answerData.length > 0) {
    //             pModel.findByIdAndUpdate(answerData[0]._id,
    //                 {
    //                     code: dataProduct.code,
    //                     nameProduct: dataProduct.nameProduct,
    //                     price: dataProduct.price
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
productsModel.delete = function (dataProduct, callback) {

    pModel.findByIdAndDelete(dataProduct.id,(error,answerData) =>{
        if(error){
            return callback({state: false, mensaje: error})
        }
        else{
            return callback({state: true})
        }
    })




    // pModel.find({ code: dataProduct.code }, {}, (error, answerData) => {
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

module.exports.modelProducts = productsModel // para exportar los modelos y que se puedan usar en los controladores