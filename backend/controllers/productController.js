const Product = require("../models/product");
const ErrorResponse = require('../utils/errorResponse');


exports.createProduct = async (req, res, next)=>{

  

    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        })
        
    } catch (error) {
        console.log(error);
        next(error);
        
    }
   
}

exports.displayProduct = async (req, res, next)=>{

  

    try {
        const products = await Product.find().populate('category');
        res.status(201).json({
            success: true,
            products
        })
        
    } catch (error) {
        console.log(error);
        next(error);
        
    }
   
}