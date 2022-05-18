const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    user_type: {
        type: String,
        enum: ['BUYER', 'SELLER'],
        default: 'BUYER'
    },
    password: { type: String },
    token: { type: String },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

var User = mongoose.model('User', UserSchema);

module.exports = User