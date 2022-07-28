const express = require('express');
const router = express.Router(); 
const {createProduct, displayProduct, deleteProduct, productCategory} = require("../controllers/productController")
const {isAuthenticated, isAdmin} = require("../middleware/auth");


router.post('/product/create', isAuthenticated, isAdmin,  createProduct );
router.get('/products/all', displayProduct );
router.delete('/product/delete/:id', isAuthenticated, isAdmin,  deleteProduct );
router.get('/product/categories',  productCategory);





module.exports = router;