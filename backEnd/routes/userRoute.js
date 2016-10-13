var express = require('express');
var userRoute = express.Router();
var User = require('../schemas/Users');
var Item = require('../schemas/Items');

userRoute.route("/")
    .get(function (req, res) {
        User.find({}, function (err, users) {
            if (err) res.status(500).send(err);
            res.send(users);
        });
    })
    .post(function (req, res) {
        var newUser = new User(req.body);
        newUser.save(function (err, savedUser) {
            if (err) res.status(500).send(err);
            res.send(savedUser);
        });
    });

module.exports = userRoute;