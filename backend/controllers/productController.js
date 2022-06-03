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

  //enable pagination
  const pageSize = 2;
  const page = Number(req.query.pageNumber) ||  1;
  const count = await Product.find({}).estimatedDocumentCount();

    try {
        const products = await Product.find().populate('category')
        .skip(pageSize * (page - 1))
        .limit(pageSize)

        res.status(201).json({
            success: true,
            products,
            page,
            pages: Math.ceil(count / pageSize),
            count

        })
        
    } catch (error) {
        console.log(error);
        next(error);
        
    }
   
}