const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({


   images: [
    {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
   ],


}, {timestamps: true});

module.exports = mongoose.model("Banner", bannerSchema);