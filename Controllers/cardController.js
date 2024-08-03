const cardModel = require('../Models/cardModel')
const jwt = require("jsonwebtoken")
const productModel = require('../Models/productModel')

const addCart = async (req, res) => {
    try {
      const userId = res.user.TOKENID;
      const productId = req.body.productId;
      const quantity = req.body.quantity; 

      let userCart = await cardModel.findOne({ userId });
  
      if (userCart) {
        const productIndex = userCart.products.findIndex(product => product.productId === productId);
  
        if (productIndex !== -1) {
          userCart.products[productIndex].quantity += quantity;
          await userCart.save();
          res.status(200).json({ message: 'Product quantity updated in the cart.' });
        } else {
          userCart.products.push({ productId, quantity });
          await userCart.save();
          res.status(200).json({ message: 'Product added to the cart.' });
        }
      } else {
        userCart = new cardModel({
          userId,
          products: [{ productId, quantity }]
        });
        await userCart.save();
        res.status(201).json({ message: 'Cart created and product added.' });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };



  const getCart = async (req, res) => {
    const userId = res.user.TOKENID;
    try {
      const userCart = await cardModel.findOne({ userId });
      if (!userCart || !userCart.products.length) {
        return res.status(404).json({ message: "No items in cart" });
      }
      const products = userCart.products;
      let cartProductArray = [];
      let totalAmount =0;
      for (let i = 0; i < products.length; i++) {
        const productId = products[i].productId; 
        const quantity = products[i].quantity;
        const product = await productModel.findOne({ id: productId });
        if (product) {
          const cartproduct={}
          cartproduct.title =product.title;
          cartproduct.description = product.description ;
          cartproduct.image= product.image
          cartproduct.price=product.price
          cartproduct.quantity=quantity
          cartproduct.totalPrize= Number(product.price)*Number(quantity)
          cartProductArray.push(cartproduct);
          totalAmount += cartproduct.totalPrize;
        } else {
          console.warn(`Product not found: ${productId}`);
        }
      }
      res.json(cartProductArray);
      console.log(cartProductArray, totalAmount);
  
    } catch (err) {
      console.error("Error fetching cart:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };


 const deleteProduct = async(req,res)=>{
    const userId = res.user.TOKENID;
    const productId = req.body.productId;
    try{
    const userCart = await cardModel.findOne({userId})

    if (userCart) {
        const products = userCart.products;
        if(products.length === 1){
             await cardModel.findOneAndDelete({userId});
             res.status(201).send("card deleted");
        }
        const newUserProduct = products.filter(product => product.productId !== productId);
        userCart.products = newUserProduct;
        await userCart.save();
       res.json({newUserProduct})
    }
    }catch(error){
        res.status(400).json({message: error.message})
    }
 }


  module.exports = {addCart,getCart,deleteProduct};