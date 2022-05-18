const express = require('express');
const bodyParser = require('body-parser');
const index_router = require('./routes/index');
const user_router = require('./routes/user_route');

require("dotenv").config();
require("./config/database").connect();


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.use('/', index_router);
app.use('/api/auth', user_router);



app.listen(process.env.PORT, function() {
    console.log(`Now listening, on ${process.env.PORT}!`)
});