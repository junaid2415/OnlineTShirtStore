// instructors code
//  importing user schema
const User = require("../models/user");

const { check, validationResult } = require("express-validator");

// web  tokens
var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');


// signup route's controller

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const user = new User(req.body);

user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });

 
};


//  signin route controller


exports.signin = (req, res)=>{

  const {email, password} = req.body; 


  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  // findone is a mongo db function that returns first found user/entity
  User.findOne({email}, (err, user)=> {

    if(err || !user){
     return res.status(400).json(
        {
          error: "Email does'nt exist "
        })
    }
    if(!user.authenticate(password))
    {
     return res.status(400).json(
        {
          error: "Email and password do not match "
        })
    }
    //create token
    
    const token = jwt.sign({_id: user._id}, process.env.SECRET )
    //put token in cookie
    res.cookie("token", token , { expire : new Date() + 9999});

    // SEND RESPONSE TO FRONT END

    const {_id, name, email, role} = user

    return res.json({
        token, user:{ _id,name,email,role}  })
                  })

}


//  signout route controller
exports.signout = (req, res) => {
  res.clearCookie("token")

  res.json({
    message: "User signout Succesful"
  });
};


//  protected routes

exports.isSignedIn = ejwt(
  {
    secret:process.env.SECRET,
    userProperty : "auth"
  }
);


// custom middle wares

exports.isAuthenticated = (req, res, next ) =>{
  let checker = req.profile && req.auth && req.profile._id == req.auth._id

  if(!checker)
  {
    res.status(403).json({ error: 'Acces Denied'})
  }

  next();
}

exports.isAdmin = (req, res, next ) =>{

    if(req.profile.role === 0 )
    {
      res.status(403).json({errror : "You dont have permissioins"})
    }

  next();
}