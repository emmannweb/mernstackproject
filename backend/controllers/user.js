const User = require("../models/user");


exports.signup = async (req, res, next)=>{

    const {email} = req.body;
    const userExist = await User.findOne({email});
    
    if (userExist){
        return  res.status(400).json({
            sucess: false,
            message: "E-mail already exists"
        })
    }

    try {
        const user = await User.create(req.body);
        res.status(201).json({
            sucess: true,
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
        
    }
   
}