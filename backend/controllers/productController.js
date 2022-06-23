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

// delete product and product image in cloudinary
exports.deleteProduct = async (req, res, next)=>{
  
      try {
          const product = await Product.findById(req.params.id);
          //retrieve current image ID
          const imgId = product.image.public_id;
          await cloudinary.uploader.destroy(imgId);
          const rmProduct = await Product.findByIdAndDelete(req.params.id);

          res.status(201).json({
              success: true,
              message:" Product deleted",
  
          })
          
      } catch (error) {
          console.log(error);
          next(error);
          
      }
     
  }




