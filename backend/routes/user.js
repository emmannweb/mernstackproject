const express = require('express');
const router = express.Router(); 
const {signup, signin, logout} = require("../controllers/user")


router.post('/signup', signup );
router.post('/signin', signin );
router.get('/logout', logout );

module.exports = router;