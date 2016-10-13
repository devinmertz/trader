var express = require('express');
var userRouteProtected = express.Router();
var User = require('../schemas/Users');
var Item = require('../schemas/Items');

// userRouteProtected.route("/")


module.exports = userRouteProtected;