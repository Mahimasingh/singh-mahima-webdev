var q = require('q');

var connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/webdev_summer2_2017'; // for local

var mongoose = require("mongoose");
var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;
module.exports = db;