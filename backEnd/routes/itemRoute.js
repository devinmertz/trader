var express = require('express');
var itemRoute = express.Router();
var User = require('../schemas/Users');
var Item = require('../schemas/Items');

itemRoute.route("/")
    .get(function (req, res) {
        Item.find({}, function (err, items) {
            if (err) res.status(500).send(err);
            res.send(items);
        });
    })
    .post(function (req, res) {
        var newItem = new Item(req.body);
        newItem.save(function (err, savedItem) {
            if (err) res.status(500).send(err);
            res.send(savedItem);
        });
    });

module.exports = itemRoute;