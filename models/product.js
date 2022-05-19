
const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: {type: String, unique: true, required: true},
    price: {type: Number, unique: true, required: true},
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;