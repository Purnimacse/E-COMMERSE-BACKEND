const express = require('express')
const Router = express.Router()
const productController = require('../Controllers/productController')

const auth = require("../Middleware/auth")

Router.get('/products', auth,productController.getAllProducts);
Router.post('/adddata', productController.addData);
Router.put('/update/:id', productController.updateById);
Router.delete('/delete/:id',productController.deleteById )

module.exports = Router;