
const orderModel = require('../Models/orderModel')
const productModel = require('../Models/productModel')
const cardModel = require("../Models/cardModel");
const { v4 : uuidv4 } = require('uuid');

const addOrder = async (req, res) => {
    const userId = res.user.TOKENID;
    try {
        // const email = res.user.tokenemail;
        const { customer_name, customer_phone, customer_address } = req.body;
        const userCart = await cardModel.findOne({ userId });
        let total = 0;
         let cardProductArray = [];
        const cardproducts = userCart.products

        for (let i = 0; i < cardproducts.length; i++) {
            const productId = cardproducts[i].productId;
            const quantity = cardproducts[i].quantity;

            const product = await productModel.findOne({ id: productId});
            console.log(product);
        //    res.json(product)
          if (product) {
          const cartproduct={}
          cartproduct.title =product.title;
          cartproduct.description = product.description ;
          cartproduct.image= product.image
          cartproduct.price=product.price
          cartproduct.quantity=quantity
          cartproduct.totalPrize= Number(product.price)*Number(quantity)
          cardProductArray.push(cartproduct);
          total+= cartproduct.totalPrize;
        } else {
          console.warn(`Product not found: ${productId}`);
        }

        }

        const orderProducts = cardProductArray;

        const orderData = new orderModel({
            id:uuidv4(),
            userId,
            customer_name,
            customer_phone,
            customer_address,
            order_date: new Date(),
            delivery_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            products: orderProducts,
           total
            // email 
        });

        await orderData.save();
        
        res.status(201).json({ message: "Order created successfully", orderData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const userId = res.user.TOKENID;
        const order = await orderModel.findOne({ userId });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        const { orderId, products, order_date, delivery_date, order_status, total } = order;
        res.status(200).json({ orderId,products, order_date, delivery_date, order_status, total });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addOrder,getOrder };

















































// const orderModel = require('../Models/orderModel')
// const cardModel = require('../Models/cardModel');
// const userModel = require('../Models/userModel');
// const productModel = require('../Models/productModel');


// const addOrder = async(req,res)=>{
//     const userId = res.user.TOKENID;
//     const {customer_name, customer_phone, customer_address}= req.body
//     try{
//     const userCart = await cardModel.findOne({userId})
//     if(!userCart || !userCart.products.length){
//        return res.status(404).json({messgse:"no item in the card"})
//     }


//         let totalAmount =0;
//         const products = userCart.products;
//         const userCartProduct=[];
//         for (let i=0;i<products.length;i++) {
            
//             const product = await productModel.findById(products[i].productId);
//             const quantity = product.quantity;
//             const price = product.price;
//             const totalProductPrice = price*quantity;
//             totalAmount += totalProductPrice;

//             userCartProduct.push({
//               productId: cartProduct.productId,
//               quantity: cartProduct.quantity
//             });
//         }

//         const newOrder = new orderModel({
//             customer_name,
//             customer_phone,
//             customer_address,
//             order_date: new Date(),
//             delivery_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
//             products,
//             totalAmount,
//             order_status: 'Pending',
//             userId
//             // email
//           });
//           await newOrder.save();
//           await cardModel.findOneAndDelete({userId});
//           res.status(201).json({ message: "Order created successfully", order: newOrder });
// }catch(error){
//     res.status(500).json({message: error.message });
// }
// }

// module.exports = {addOrder}







// const orderModel = require('../Models/orderModel');
// const cardModel = require('../Models/cardModel');
// const userModel = require('../Models/userModel');
// const productModel = require('../Models/productModel');

// const addOrder = async (req, res) => {
//   const userId = res.user;
//   const { customer_name, customer_phone, customer_address } = req.body;
//   try {
//     const userCart = await cardModel.findOne({ userId });
//     if (!userCart || !userCart.products.length) {
//       return res.status(404).json({ message: "No items in the cart" });
//     }

//     let totalAmount = 0;
//     const userCartProduct = [];

//     for (let i = 0; i < userCart.products.length; i++) {
//       const cartProduct = userCart.products[i];
//       const product = await productModel.findById(cartProduct.productId);
//       if (!product) {
//         return res.status(404).json({ message: `Product with ID ${cartProduct.productId} not found` });
//       }
//       const quantity = cartProduct.quantity;
//       const price = product.price; // assuming price is stored in the product model
//       const totalProductPrice = price * quantity;
//       totalAmount += totalProductPrice;

//       userCartProduct.push({
//         productId: cartProduct.productId,
//         quantity: cartProduct.quantity
//       });
//     }

//     const newOrder = new orderModel({
//       customer_name,
//       customer_phone,
//       customer_address,
//       order_date: new Date(),
//       delivery_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
//       products: userCartProduct,
//       totalAmount,
//       order_status: 'Pending',
//       userId
//     });

//     await newOrder.save();
//     await cardModel.findOneAndDelete({ userId });

//     res.status(201).json({ message: "Order created successfully", order: newOrder });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { addOrder };



