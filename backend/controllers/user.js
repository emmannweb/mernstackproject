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


exports.signin = async (req, res, next)=>{

    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "E-mail and password are required"
            })
        }

        // check user e-mail
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        // verify user password
        const isMatched = await user.comparePassword(password);
        if (!isMatched){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = await user.jwtGenerateToken();

        res.status(200).json({
            sucess:true,
            token
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Cannot log in, check your credentials"
        })
    }
   
}


