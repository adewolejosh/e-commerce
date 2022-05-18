
const express = require('express');
const auth = require("../middlewares/authentication");

const router = express.Router();

router.route('').get(auth,
    function (req, res) {
        res.status(200).send("Welcome to Our E-commerce API");
    }
);

module.exports = router;