const jwt =  require("jsonwebtoken")


const auth = (req,res,next)=>{
    // const token = req.header("Authorization").replace("Bearer"," ");  //getting the generated token
    const token = req.header("Authorization").split(" ")[1]

    if(!token){
        return res.status(401).json({error:"token required"});
    }
    try{
        const decoded =  jwt.verify(token, "secret_key");
        res.user = decoded;
        //req.user: decoded.userId;
        next();
    }catch(error){
        res.status(401).json({error:"invalid token"});
    }
};
module.exports = auth;










// req.header("Authorization"):

// req is the request object provided by Express.js.
// header("Authorization") is a method to retrieve the value of the Authorization header from the HTTP request.
// The Authorization header typically contains a value in the format "Bearer <token>". Eg:( Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3 )
