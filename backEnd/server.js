var express = require('express');
var cors = require('cors');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
var Items = require('./schemas/Items');
var Users = require('./schemas/Users');

mongoose.connect('mongodb://localhost/trader');



var userRoute = require('./routes/userRoute');
var itemRoute = require('./routes/itemRoute');
//var routes = require('./routes/index');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

//app.use('/', routes);
app.use('/user', userRoute);
app.use('/item', itemRoute);

app.use(express.static(path.join(__dirname, "../frontEnd/")));

app.listen(port, function () {
    console.log("You have reached port " + port)
});