const Product = require("../models/product");
const Category = require("../models/category");
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../utils/cloudinary');



exports.createProduct = async (req, res, next) => {

    const { name, description, price, image, category } = req.body;


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

exports.displayProduct = async (req, res, next) => {

    //enable pagination
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Product.find({}).estimatedDocumentCount();

    //all categories ids
    let ids = [];
    const categ = await Category.find({}, { _id: 1 });
    categ.forEach(cat => {
        ids.push(cat._id);
    })

    //filter
    let cat = req.query.cat;
    let query = cat !== '' ? cat : ids;


    try {

        const products = await Product.find({ category: query }).populate('category', 'name')
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

// Update product image in Cloudinary and product data in MongoDB.
exports.updateProduct = async (req, res, next) => {
    try {
        //current product
        const currentProduct = await Product.findById(req.params.id);

        //build the data object
        const data = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        }

        //modify image conditionnally
        if (req.body.image !== '') {
            const ImgId = currentProduct.image.public_id;
            if (ImgId) {
                await cloudinary.uploader.destroy(ImgId);
            }

            const newImage = await cloudinary.uploader.upload(req.body.image, {
                folder: "products",
                width: 1000,
                crop: "scale"
            });

            data.image = {
                public_id: newImage.public_id,
                url: newImage.secure_url
            }
        }

        const productUpdate = await Product.findOneAndUpdate(req.params.id, data, { new: true })

        res.status(200).json({
            success: true,
            productUpdate
        })


    } catch (error) {
        console.log(error);
        next(error);
    }

}



// delete product and product image in cloudinary
exports.deleteProduct = async (req, res, next) => {

    try {
        const product = await Product.findById(req.params.id);
        //retrieve current image ID
        const imgId = product.image.public_id;
        if (imgId) {
            await cloudinary.uploader.destroy(imgId);
        }

        const rmProduct = await Product.findByIdAndDelete(req.params.id);

        res.status(201).json({
            success: true,
            message: " Product deleted",

        })

    } catch (error) {
        console.log(error);
        next(error);

    }

}





// display category
exports.productCategory = async (req, res, next) => {

    try {
        const cat = await Product.find().populate('category', 'name').distinct('category');
        res.status(201).json({
            success: true,
            cat
        })

    } catch (error) {
        console.log(error);
        next(error);
    }

}




