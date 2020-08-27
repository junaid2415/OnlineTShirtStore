var express = require('express')
var router = express.Router()
const {signout, signup, signin, isSignedIn} = require("../controllers/auth")

const { check, validationResult } = require('express-validator');



router.post("/signup",[
    check('name','Name should be atleast 3 char').isLength({min: 3}),
    check('email','Email is required').isEmail(),
    check('password','password should be atleast 6 char').isLength({min: 6})
],signup);



router.post("/signin",[
    check('email','Email is required').isEmail(),
    check('password','password feild is required').isLength({min: 3})
],signin);



router.get('/signout', signout);


router.get('/test',  isSignedIn ,(req, res)=>{
    res.json(req.auth);
});


module.exports = router;