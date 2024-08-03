const express = require("express")
const Router = express.Router()
const cardController = require('../Controllers/cardController')
const auth =  require ('../Middleware/auth')

Router.post('/addtocard',auth,cardController.addCart);
Router.get('/gettocard',auth,cardController.getCart)
Router.delete('/delete',auth ,cardController.deleteProduct )
module.exports = Router;