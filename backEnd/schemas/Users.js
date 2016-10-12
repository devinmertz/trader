var mongoose = require('mongoose');
var Schema = mongoose.schema;
var ItemSchema = require('./Items').Schema;

var UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	userName: {
		type: String,
		required: true
	},
	imgUrl: String,
	location: String,
	tradeItems: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Item'
	}
});

module.exports = mongoose.model('User', UserSchema);