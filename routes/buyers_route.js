
const User = require("../models/user");
const Catalog = require("../models/catalogue");
const express = require('express');
const { buyerPerm } = require("../middlewares/permission");
const Product = require("../models/product");
const Order = require("../models/order");


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
};

const catalogOfSellers = async function(req, res) {
    try {
        const { sellerId } = req.params.seller_id;

        cur_seller = await User.findOne({user_id: sellerId});

        sellerCat = await Catalog.findOne({seller: cur_seller['_id']})
        .then(data => {
            return data;
        });
        if (sellerCat){
            return res.status(200).send(sellerCat);
        } else {
            return res.status(404).send('{ "message": "catalog does not exist!"}');
        }
    } catch (err) {
        console.log(err);
    }
};

const createOrders = async function(req, res) {
    try {
        console.log(req.headers);
        const { sellerId } = req.params.seller_id;
        const { products } = req.body;

        console.log(sellerId, products);

        if (!products) {
            return res.status(400).send("You have not selected any products from this catalogue");
        }
        

        cur_seller = await User.findOne({user_id: sellerId});
        
        sellerCatID = await Catalog.findOne({seller: cur_seller['_id']})
        .then(data => {
            return data['_id'];
        });

        for (elem in products) {
            product = await Product.findOne({_id: products['id'][elem]})
            .then(data => {
                return data;
            });
            if(sellerCatID['products'].indexOf(product === -1) ){
                return res.status(404).send("{'message': 'one or more products not in this category'");
            }
        }

        new_order = Order.create({
            buyer: req.user['user_id'],
            seller: cur_seller,
            products: products,
        })

        return res.status(201).json(new_order);
    } catch (err) {
        console.log(err);
    }
};


const router = express.Router();

router.route('/list-of-sellers/')
.get(buyerPerm, listOfSellers);

router.route('/seller-catalog/:seller_id/')
.get(buyerPerm, catalogOfSellers);

router.route('/create-order/:seller_id/')
.post(buyerPerm, createOrders);

module.exports =  router;
