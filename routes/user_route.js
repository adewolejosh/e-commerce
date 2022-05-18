
var bcrypt = require('bcryptjs');
const User = require("../models/user");
const express = require('express');
const jwt = require('jsonwebtoken');

const RegisterUser = async function (req, res) {
    const { first_name, last_name, email, user_type,  password } = req.body;
    console.log(first_name,last_name,email,user_type,password);

    try {
        if (!(first_name && last_name && email && user_type && password)) {
            
            return res.status(400).send("All fields are required");
        }

        user_exists = await User.findOne({email})
        if (user_exists) {
            return res.status(409).send("User with such mail already exists");
        }

        var e_password;
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function(err, hash) { 
            e_password = hash;
        });

        const user = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            user_type: user_type,
            password: e_password
        });

        const user_token = jwt.sign(
            { user_id: user._id, email: email },
            process.env.TOKEN_KEY,
            {
              expiresIn: 60*24*5,
            }
        );
        
        user.token = user_token
        return res.status(201).json(user)
    } catch (error) {
        console.log(error)
    }
};

const LoginUser = function(req, res) {

};


const router = express.Router();

router.route('/register/')
.post(RegisterUser);

router.route('/login/')
.post(LoginUser);

module.exports =  router;