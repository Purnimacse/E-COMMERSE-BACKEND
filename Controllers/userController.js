const userModel = require('../Models/userModel')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const login = async(req,res)=>{
    const {email,password} = req.body;
    const user =  await userModel.findOne({email});
    try{
    if(!user){
        return res.status(404);
    }
    const invalidPassward =  await bcrypt.compare(password, user.password);
    if(!invalidPassward){
        return res.status(404).json({message: "invalid password"});
    }
    const token = jwt.sign({TOKENID: user._id}, "secret_key",{   //jwt ope -  sign and validate
        expiresIn:"1h",
    });
    res.json({token})
}catch(err){
    console.log(err);
}
}



const register = async(req,res)=>{
    const {name, email,password}= req.body;
    const insertdata = new userModel({
        name, email,password
    });
    try{
        const inserteddata = await insertdata.save();
        res.status(201).send(inserteddata);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};


module.exports={register,login};