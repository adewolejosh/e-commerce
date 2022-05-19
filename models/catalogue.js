
const mongoose = require("mongoose");

const CatalogSchema = new mongoose.Schema({
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Products', unique: true, required: true}]
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


var Catalog = mongoose.model('Catalog', CatalogSchema);

module.exports = Catalog