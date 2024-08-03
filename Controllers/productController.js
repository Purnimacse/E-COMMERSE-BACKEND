// const mongoose = require('mongoose')
// const cors = require('cors')
// app.use(mongoose)
// app.use(cors())
// app.use(express.json())

// app.get('/',(req,res)=>{
// productModel.find({})
// .then(result=> res.json(result))
// .catch(err=> res.json(err))
// })


const { v4 : uuidv4 } = require('uuid');

const productModel = require('../Models/productModel')



const getAllProducts = async(req,res)=>{
    try{
    const products= await productModel.find();
    res.send(products);
    }catch(error){
        // res.send({error: error.message})
        console.error(error);
    }
};

const addData = async(req,res)=>{

        const {id, title, description,category, price,image, rating} = req.body;
        const product = new productModel({
          id:uuidv4(),title, description, category, price, image,rating}
        );
    try{
    const savedata = await product.save();
    res.status(201).send(savedata);
    } catch(error){
    res.status(400).json({message: error.message});
}   
};

const updateById = async(req,res)=>{
const id = req.params.id;
     try{
           await productModel.findOneAndUpdate({id},{
            title:req.body.title,
            description:req.body.description
           })  
           res.json("done")
     }
     catch(err){
        res.json(err)
     }
}

const deleteById = async(req,res)=>{
    const id = req.params.id;
    try{
        await productModel.findOneAndDelete({id})
        res.send("deleted")
    }catch(error){
        res.send(error)
    }
}

module.exports = {getAllProducts,addData,updateById,deleteById};

