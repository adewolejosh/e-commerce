
const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: {type: String},
    price: {type: Number},
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;