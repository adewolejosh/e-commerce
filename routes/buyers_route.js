
const User = require("../models/user");
const express = require('express');
const { buyerPerm } = require("../middlewares/permission");


// only takes in json.
const listOfSellers = async function(req, res) {
    try {
        sellers = await User.find({user_type: 'SELLER'})
        .then(data =>{
            return data
        })
        if (sellers){
            return res.status(200).json(sellers);
        } else {
            return res.status(200).send({"message": "no sellers yet"})
        }
    } catch (err) {
        console.log(err);
    }
}

const  catalogOfSellers = async function(req, res) {
    try {

    } catch (err) {

    }
}

const  orderList = async function(req, res) {
    try {

    } catch (err) {

    }
}


const router = express.Router();

router.route('/list-of-sellers')
.get(buyerPerm, listOfSellers);

router.route('/seller-catalog/:seller_id')
.get(buyerPerm, catalogOfSellers);

router.route('/create-order/:seller_id')
.post(buyerPerm, orderList);

module.exports =  router;
