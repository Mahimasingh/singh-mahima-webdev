var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("../database");
var userModel = mongoose.model("UserModel", userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUserById = deleteUserById;
userModel.addWebsite = addWebsite;
userModel.deleteWebsite = deleteWebsite;
module.exports = userModel;

function deleteWebsite(userId,websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index,1);
            return user.save();
            
        });

}

function addWebsite(userId, websiteId){
    return userModel
        .findUserById(userId)
        .then(function(user){
            user.websites.push(websiteId);
            return user.save();
        });
}

function deleteUserById(userId) {
    return userModel.remove({_id:userId});

}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, user) {
    return userModel.update({_id: userId},
        {$set: user});
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});

}