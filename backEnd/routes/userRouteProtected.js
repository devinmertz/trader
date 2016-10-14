var express = require('express');
var userRouteProtected = express.Router();
var User = require('../schemas/Users');
var Item = require('../schemas/Items');
var _ = require('lodash');

// User's personal information ~
userRouteProtected.route("/")
    .get(function (req, res) {
        User.findById(req.user._doc._id)
            .populate("messages.from")
            .populate("tradeItems")
            .exec(function (err, foundUser) {
                if (err) res.status(500).send(err);
                res.send(foundUser);
            });
    });

// User's personal trade items
userRouteProtected.route("/items")
    // GET all posted items ~ (check for populated fields)
    .get(function (req, res) {
        Item.find({
                owner: req.user._doc._id
            })
            .populate("offers.from")
            .populate("offers.willTradeFor")
            .exec(function (err, foundItems) {
                if (err) res.status(500).send(err);
                res.send(foundItems);
            });
    })
    // POST new trade items ~
    .post(function (req, res) {
        User.findOne({
            _id: req.user._doc._id
        }, function (err, foundUser) {

            if (err) {
                res.status(500).send(err);
            } else {
                var newItem = new Item(req.body);
                newItem.owner = req.user._doc._id;
                newItem.save(function (err, savedItem) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        foundUser.tradeItems.push(savedItem._id);
                        foundUser.save(function (err, savedUser) {
                            if (err) res.status(500).send(err);
                            res.send(savedItem);
                        });
                    }
                });
            }
        });
    });

userRouteProtected.route("/items/:itemId")
    // GET a single item by ID ~ (check populated fields)
    .get(function (req, res) {
        Item.find({
                _id: req.params.itemId,
                owner: req.user._doc._id
            })
            .populate("offers.from")
            .populate("offers.willTradeFor")
            .exec(function (err, foundItem) {
                if (err) res.status(500).send(err);
                res.send(foundItem);
            });
    })
    // PUT an update on existing items ~
    .put(function (req, res) {
        User.findById(req.user._doc._id, function (err, foundUser) {
            console.log("foundUser ", foundUser);
            if (err) {
                res.status(500).send(err);
            } else {
                Item.findOneAndUpdate({
                        _id: req.params.itemId,
                        owner: foundUser._id
                    }, req.body, {
                        new: true
                    },
                    function (err, updatedItem) {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            var index = foundUser.tradeItems.indexOf(req.params.itemId);
                            if (index === -1) {
                                res.status(500).send("User does not have the item listed.");
                            } else {
                                foundUser.tradeItems.splice(index, 1, updatedItem);
                                foundUser.save(function (err, savedUser) {
                                    if (err) res.status(500).send(err);
                                    res.send(updatedItem);
                                });
                            }
                        }
                    });
            }
        });

    })
    // DELETE a single item ~
    .delete(function (req, res) {
        User.findById(req.user._doc._id, function (err, foundUser) {
            console.log("foundUser ", foundUser);
            console.log("req.user._doc._id ", req.user._doc._id);
            console.log("req.params._id ", req.params._id);
            if (err) {
                res.status(500).send(err);
            } else {
                Item.findOneAndRemove({
                    _id: req.params.itemId,
                    owner: req.user._doc._id
                }, function (err, deletedItem) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        _.remove(foundUser.tradeItems, function (n) {
                            return n === deletedItem; //?
                        });
                        console.log("foundUser.tradeItems ", foundUser.tradeItems);
                        res.send(deletedItem);
                    }
                });
            }
        });
    });

// User's personal information


module.exports = userRouteProtected;