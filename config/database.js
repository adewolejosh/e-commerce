const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

console.log(MONGODB_URI);

exports.connect = () => {
    mongoose.connect(MONGODB_URI, {})
    .then(() => {
        console.log("Successfully connected to MongoDB server!");
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })
}