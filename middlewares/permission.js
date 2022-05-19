const jwt = require("jsonwebtoken");
const User = require("../models/user");

const envToken = process.env;

const sellerPerm = async (req, res, next) => {
    const token = req.query.token || req.headers["x-access-token"] || req.headers["authorization"].split(" ")[1];
    try {
        const decoded = jwt.verify(token, envToken.TOKEN_KEY);
        req.user = decoded;
        user_type = await User.findOne({email: req.user['email']})
        .then(data =>
            data['user_type']
        );
        if (user_type == "BUYER") {
            return res.status(403).send("Unauthorized!");
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

const buyerPerm = async (req, res, next) => {
    const token = req.query.token || req.headers["x-access-token"] || req.headers["authorization"].split(" ")[1];
    try {
        const decoded = jwt.verify(token, envToken.TOKEN_KEY);
        req.user = decoded;
        user_type = await User.findOne({email: req.user['email']})
        .then(data =>
            data['user_type']
        );
        if (user_type == "SELLER") {
            return res.status(403).send("Unauthorized!");
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};



module.exports = {sellerPerm, buyerPerm};