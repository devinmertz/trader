var express = require('express');
var itemRoute = express.Router();
var User = require('../schemas/Users');
var Item = require('../schemas/Items');

// This route is for unprotected item postings

// GET all posted items
itemRoute.route("/")
    .get(function (req, res) {
        Item.find({}, function (err, items) {
            if (err) res.status(500).send(err);
            res.send(items);
        });
    });

// GET a single posted item by id
itemRoute.route("/:itemId")
    .get(function (req, res) {
        Item.findById(req.params._id, function (err, foundItem) {
            if (err) res.status(500).send(err);
            res.send(foundItem);
        });
    });

// GET items by name
itemRoute.route("/name")
    .get(function (req, res) {
        Item.find({
                name: req.query.name
            })
            .populate("owner", "username")
            .populate("owner", "imgUrl")
            .populate("owner", "location")
            .populate("owner", "lookingFor")
            .exec(function (err, foundItems) {
                if (err) res.status(500).send(err);
                res.send(foundItems);
            });
    });

// GET all items within a specific category
itemRoute.route("/category/:categoryId")
    .get(function (req, res) {
        Item.find({
                category: req.params.categoryId
            })
            .populate('owner')
            .exec(function (err, items) {
                if (err) res.status(500).send(err);
                res.send(items);
            });
    });

module.exports = itemRoute;