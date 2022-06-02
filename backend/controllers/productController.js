const Product = require("../models/product");
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../utils/cloudinary');


exports.createProduct = async (req, res, next)=>{

    const {name, description, price, image, category} = req.body;


    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: "products",
            // width: 300,
            // crop: "scale"
        })
        const product = await Product.create({
            name,
            description,
            price,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            },
            category
        });
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