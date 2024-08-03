const express = require("express")
const Router = express.Router()
const orderController = require('../Controllers/orderController')
const auth = require ('../Middleware/auth')

Router.post('/addorder',auth, orderController.addOrder)
Router.get('/getorder', auth,orderController.getOrder)
 
module.exports = Router;