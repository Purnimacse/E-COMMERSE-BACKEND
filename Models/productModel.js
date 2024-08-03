const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    id: {
        type:String,
        unique: true,
    },
    title: {
        type:String,
        required: [true,"TITLE REQUIRED"]
    },
    description: {
        type:String,
         required: true
    },
    category: {
        type:String
    },
    price: {
        type: Number
    },
    image: {
        type:String
    },
    rating:[{
        rate:{type: String},
        count:{type : Number}
    }]
})
const productModel = mongoose.model('products',productSchema)
module.exports = productModel;