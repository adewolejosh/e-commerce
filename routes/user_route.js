
var bcrypt = require('bcryptjs');
const User = require("../models/user");
const express = require('express');
const jwt = require('jsonwebtoken');


// only takes in json.

const RegisterUser = async function (req, res) {
    
    try {
        const { username, email, user_type,  password } = req.body;
        if (!(username && email && user_type && password)) {
            
            return res.status(400).send("All fields are required");
        }

        user_exists = await User.findOne({email}) || await User.findOne({username});
        if (user_exists) {
            return res.status(409).send("User with such mail already exists");
        }

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        const user = await User.create({
            username: username,
            email: email,
            user_type: user_type,
            password: hash
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


const LoginUser = async function(req, res) {

    try {
        const { email, password } = req.body;
        if (!(email && password)){
            return res.status(400).send("An Email and Password is required");
        }

        user_exists = await User.findOne({email})
        if(!user_exists){
            return res.status(200).send("No such user");
        }
        hash = user_exists.password;
        valid = bcrypt.compareSync(password, hash);

        if (user_exists && valid) {
            const user_token = jwt.sign(
                { user_id: user_exists._id, email: email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: 60*24*5,
                }
            );
            user_exists.token = user_token
            return res.status(200).json(user_exists) 
        }
        return res.status(409).send("Invalid Credentials")        
    } catch(error){
        console.log(error);
    }
};


const router = express.Router();

router.route('/register/')
.post(RegisterUser);

router.route('/login/')
.post(LoginUser);

module.exports =  router;