const express= require('express')
const routes=express.Router()
const products=require('../controller/product')
const Image=require("../middleware/upload")

routes.post("/add_product",Image.array("productImage",20),products.addProduct)
routes.post("/get_product",products.getProduct)
routes.post("/get_productbyId",products.getProductbyId)
routes.post("/delete_ProductbyId",products.deleteProductbyId)
// routes.post("/addToCard",products.addToCard)


module.exports = routes;  