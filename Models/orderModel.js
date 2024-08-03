const mongoose = require("mongoose")
const orderSchema =  new mongoose.Schema({
    orderId:{
        type:String
    },
    customer_name:{
        type:String
    },
    customer_phone:{
        type:String
    },
    customer_address:{
        type:String
    },
    order_date:{
        type: Date,
    },
    delivery_date:{
        type: Date
    },
    products:[{
        // productId:String,
        // quantity: Number
    }],
   
    totalAmount:{
        type: Number
    },
    order_status:{
        type:String,
        default:"pending"
    },
    userId:{
        type: String
    },
    email:{
        type:String
    }
})
const orderModel =  mongoose.model('order', orderSchema);
module.exports = orderModel;

