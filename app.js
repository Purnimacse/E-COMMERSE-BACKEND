const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Productroutes = require('./Routers/productRouter')
const Userrouter = require ('./Routers/userRouter')
const Cardrouter = require('./Routers/cardRouter')
const orderrouter = require('./Routers/orderRouter')
const bodyparser = require("body-parser");


const app = express();
app.use(bodyparser.json());
app.use(cors());
// app.use(express.json())
mongoose.connect("mongodb+srv://purni10:10p2004P@cluster0.dkuds2u.mongodb.net/ecommerse"

).then(()=>{
    console.log("connected");
});
app.set("view engine","ejs");
app.use('/',Productroutes);
app.use('/',Userrouter);
app.use('/',Cardrouter);
app.use('/',orderrouter);

app.listen(3000,()=>{
    console.log("server is running")
});
