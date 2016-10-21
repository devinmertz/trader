var express = require('express');
var itemRouteProtected = express.Router();
var User = require('../schemas/Users');
var Item = require('../schemas/Items');

// This route is for accessing user-specific data

itemRouteProtected.route("/")
	// GET all items posted by a user
	.get(function (req, res) {
		Item.find({
			owner: req.user._id
		}, function (err, items) {
			if (err) res.status(500).send(err);
			res.send(items);
		});
	})
	// POST a new item listing
	.post(function (req, res) {
		var newItem = new Item(req.body);
		newItem.save(function (err, savedItem) {
			if (err) res.status(500).send(err);
			res.send(savedItem);
		});
	});

itemRouteProtected.route("/:itemId")
	// GET one item posting and populate relevant data
	.get(function (req, res) {
		Item.findOne({
				_id: req.params.itemId,
				owner: req.user._id
			})
			.populate('offers.from')
			.populate('offers.willTradeFor')
			.exec(function (err, foundItem) {
				if (err) res.status(500).send(err);
				res.send(foundItem);
			});
	})
	// PUT an item posting
	// This will need to be updated to handle offers
	.put(function (req, res) {
		console.log(req.body);
		Item.findOneAndUpdate({
				_id: req.params.itemId,
				owner: req.body.owner //._id
			}, req.body, {
				new: true
			},
			function (err, updatedItem) {
				if (err) res.status(500).send(err);
				res.send(updatedItem);
			});
	})
	// DELETE an item posting
	.delete(function (req, res) {
		Item.findOneAndRemove({
			_id: req.params.itemId,
			owner: req.user._id
		}, function (err, deletedItem) {
			if (err) res.status(500).send(err);
			res.send(deletedItem);
		});
	});

// POST a new message to the item's offers array
// send POST to (baseUrl + /api/item/message/:itemId, { tradeFor: "ipod", message: "I will trade for that" })
// :itemId will be the _id corresponding to the Item collection
// the offer.from will be added in this endpoint from the req.user._id
itemRouteProtected.route("/message/:itemId")
	.post(function (req, res) {
		Item.findOne({
			_id: req.params.itemId
		}, function (err, foundItem) {
			if (err) {
				res.status(500).send(err);
			} else {
				//console.log(req.user);
				//req.body.from = req._doc._id;
				foundItem.offers.push(req.body);
				console.log(foundItem);
				foundItem.save(function (err, savedItem) {
					if (err) res.status(500).send(err);
					res.send(savedItem);
				});
			}
		});
	});

module.exports = itemRouteProtected;