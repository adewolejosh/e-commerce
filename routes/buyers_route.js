
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

        // pro = [];
        // for(let elem of sellerCat['products']){
        //     pro.push(await Product.findOne({id: elem}));
        // }

        if (sellerCat){
            // s = JSON.stringify(sellerCat);
            // jpro = s.concat(JSON.stringify(pro));
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
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send("You have not selected any products from this catalogue");
        }

        const { sellerId } = req.params['seller_id'];
        // const { products } = req.body;

        console.log(req.params['seller_id'], req.body);


        cur_seller = await User.findOne({_id: req.params['seller_id']});
        
        sellerCatID = await Catalog.findOne({seller: cur_seller['_id']})
        .then(data => {
            return data;
        });

        for (elem of req.body) {
            if (!(sellerCatID['products'].includes(elem))) {
                console.log(elem);
                return res.status(404).send("{'message': 'one or more products not in this category'");
            }
        }

        order_exists = await Order.findOne({buyer: req.user['user_id'], seller: cur_seller});
        if (order_exists) {
            old_order = await Order.findOneAndUpdate({
                buyer: req.user['user_id'],
                seller: cur_seller,
            }, {$addToSet: { products: req.body}} )
            return res.status(201).send("One or more Already exist in order");
        } else {
            new_order = await Order.create({
                buyer: req.user['user_id'],
                seller: cur_seller,
                products: req.body,
            });
            return res.status(201).send(new_order);
        }
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
