const express = require('express');
const router = express.Router(); 
const {signup, signin, logout, singleUser, userProfile } = require("../controllers/auth");
const {isAuthenticated} = require("../middleware/auth");


router.post('/signup', signup );
router.post('/signin', signin );
router.get('/logout', logout );
router.get('/getme', isAuthenticated,  userProfile );
router.get('/user/:id', singleUser );



module.exports = router;