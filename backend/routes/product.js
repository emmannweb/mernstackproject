const express = require('express');
const router = express.Router(); 
const {createProduct, displayProduct} = require("../controllers/productController")
const {isAuthenticated, isAdmin} = require("../middleware/auth");


router.post('/product/create', isAuthenticated, isAdmin,  createProduct );
router.get('/products/all', displayProduct );



module.exports = router;