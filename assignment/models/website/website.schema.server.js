var mongoose = require("mongoose");

var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now},
    _pages: [{type: mongoose.Schema.Types.ObjectId, ref: "pageModel"}]
},{collection: 'websites'});

module.exports = websiteSchema;