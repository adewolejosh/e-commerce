
const express = require('express');
const auth = require("../middlewares/authentication");
const { buyerPerm, sellerPerm } = require("../middlewares/permission");
const User = require("../models/user");


const router = express.Router();

router.route('').get(auth,
    async function (req, res) {
        return res.status(200).send("Welcome to Our E-commerce API");
    }
);

module.exports = router;