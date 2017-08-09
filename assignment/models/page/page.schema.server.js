var mongoose = require("mongoose");

var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: "websiteModel"},
    name: String,
    title: String,
    description: String,
    dateCreated: {type: Date, default: Date.now},
    _widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "widgetModel"}]
},{collection: 'websites'});

module.exports = pageSchema;