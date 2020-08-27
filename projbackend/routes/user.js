const express = require('express');
const router = express.Router()

const {getUserById, getUser, updateUser, getUserOrders} =require('../controllers/user')
const { isAdmin, isAuthenticated, isSignedIn} =require('../controllers/auth')

router.param("userId" , getUserById )
// check if userId need to be  same
router.get("/user/:userId",isSignedIn, isAuthenticated,getUser);

router.put("/user/:userId",isSignedIn, isAuthenticated, updateUser);

router.get("/orders/user/:userId",isSignedIn, isAuthenticated, getUserOrders);


module.exports = router
