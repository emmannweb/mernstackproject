const express = require('express');
const router = express.Router(); 
const {createProduct} = require("../controllers/productController")


router.post('/product/create', createProduct );



module.exports = router;