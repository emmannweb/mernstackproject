const express = require('express');
const router = express.Router(); 
const {signup, signin, logout, singleUser } = require("../controllers/user")


router.post('/signup', signup );
router.post('/signin', signin );
router.get('/logout', logout );
router.get('/user/:id', singleUser );



module.exports = router;