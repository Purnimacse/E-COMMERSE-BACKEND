const mongoose = require("mongoose")
const bcrypt =require("bcryptjs")
const userSchems = new mongoose.Schema({
    name:{
        type: String,
        requird: true
    },
    email:{
        type: String,
        unique: true,
        required: [true, "email is required"]
    },
    password:{
        type:String,
        required: [true, "password is required"]
    }
});

userSchems.pre("save", async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt =  await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const userModel = mongoose.model('users', userSchems)
module.exports= userModel