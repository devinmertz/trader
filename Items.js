var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = require('./Users').Schema;

var ItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true,
		enum: ['entertainment', 'auto', 'clothing', 'furniture', 'other']
	},
	imgUrl: String
});

module.exports = mongoose.model('Item', ItemSchema);