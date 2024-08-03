const mongoose =  require("mongoose")
const cardSchema =  new mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    products:[
        {
        productId:String,
         quantity:Number
        }
    ]
})
const cardModel = mongoose.model('card', cardSchema);
module.exports = cardModel;