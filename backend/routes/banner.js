const express = require('express');
const router = express.Router(); 
const {createBanner, displayBanner} = require("../controllers/bannerController")


router.post('/banner/create', createBanner );
router.get('/fetch/banner', displayBanner );




module.exports = router;