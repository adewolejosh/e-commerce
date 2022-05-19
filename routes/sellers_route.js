
const User = require("../models/user");
const express = require('express');
const Catalog = require("../models/catalogue");
const Product = require("../models/product");
const { sellerPerm } = require("../middlewares/permission");
const Order = require("../models/order");


const createCatalog = async function(req, res) {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send("All product details required for catalog")
        }

        // for(elem of req.body){
        //     if (!(elem["name"] && elem["price"])){
        //         return res.status(409).send("An error occured, fill in all details");
        //     };
        // }

        products_added = await Product.insertMany(req.body)
        .then((products) => {
            return products
        })

        catalog_exists = await Catalog.findOne({seller: req.user['user_id']});

        if (catalog_exists){
            old_catalog = await Catalog.findOneAndUpdate({seller: req.user['user_id']}, {$addToSet: { products: products_added}});
            return res.status(200).json(catalog_exists);
        } else {
         new_catalog = await Catalog.create({
            seller: req.user['user_id'],
            products: products_added
            });
            return res.status(201).json(new_catalog);
        }

    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

const listOfOrders = async function(req, res) {
    try {
        orders = await Order.find({seller: req.user['user_id']})
        .then(data => {
            return data;
        })
        if (orders.length >= 1){
            return res.status(200).json(orders);
        } else{
            return res.status(404).send("No orders yet!");
        }
       
    } catch (err) {
        console.log(err);
    }
}



const router = express.Router();

router.route('/create-catalog/')
.post(sellerPerm, createCatalog);

router.route('/orders/')
.get(sellerPerm, listOfOrders);

module.exports =  router;