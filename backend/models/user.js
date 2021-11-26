const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

   name: {
       type: String,
       trim: true,
       required : [true, 'Please add a Name'],
       maxlength: 32
   },

   email: {
       type: String,
       trim: true,
       required : [true, 'Please add a E-mail'],
       unique: true,
       match: [
           /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
           'Please add a valid E-mail'
       ]

   },

   password: {
       type: String,
       trim: true,
       required : [true, 'Please add a Password'],
       minlength: [6, 'password must have at least six(6) characters'],
       match: [
           /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
           'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters'
       ]
   },

   role: {
       type: Number,
       default: 0,
  
   },



}, {timestamps: true});



// encrypting password before saving
userSchema.pre('save', async function(next){

   if(!this.isModified('password')){
       next()
   }
   this.password = await bcrypt.hash(this.password, 10);
});



// verify password
userSchema.methods.comparePassword = async function(yourPassword){
    return await bcrypt.compare(yourPassword, this.password);
}

// get the token
userSchema.methods.jwtGenerateToken = function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}


module.exports = mongoose.model("User", userSchema);