const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router =  express.Router();
const JWt_SECRET = 'myjwtsecrets';
const jwt = require('jsonwebtoken');

//Todo: user creation
router.post('/signup',[
    body('email','enter a valid email').isEmail(),
    body('password','enter a valid password atleast of 5 character').isLength({ min: 5 })
],async(req,res) => {
    let success = false;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({success,errors});
    }
    try {
    let user = await User.findOne({ email: req.body.email});
    if(user)
    {
        return res.status(400).json({ success,message: "a user with this email already exists"})
    }
    const salt= await bcrypt.genSalt(10);
    const secpassword = await bcrypt.hash(req.body.password,salt);
     user= await  User.create({
        password: secpassword,
        email: req.body.email,
         name:req.body.name,
      })
        const data={
            user: {
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWt_SECRET);
        // console.log("user created successfully");
        success=true;
        res.json({success,authtoken});
    }
    catch (err) {
        console.error(err);
        success=false;
        res.status(400).json({success, message: err})
    }
})
//todo: login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({success, error: "Please try to login with correct credentials" });
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWt_SECRET);
        success = true;
        res.json({ success, authtoken });
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
