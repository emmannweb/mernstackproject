const express = require('express');
const router = express.Router(); 
const {createCategory, getCategories} = require("../controllers/categoryController")


router.post('/category/create', createCategory );
router.get('/category/all', getCategories );



module.exports = router;