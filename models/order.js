const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true},
    products:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Products', unique: true, required: true}],
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;