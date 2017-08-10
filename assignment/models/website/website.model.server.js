var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('websiteModel',websiteSchema);
var db = require("../database");
var userModel = require('../user/user.model.server')
websiteModel.findAllWebsites = findAllWebsites;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.addPage = addPage;
websiteModel.deletePage = deletePage;
module.exports = websiteModel;

function addPage(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function(website){
            website._pages.push(pageId);
            return website.save();
        });
}

function deletePage(websiteId,pageId){
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            var index = website._pages.indexOf(pageId);
            website._pages.splice(index,1);
            return website.save();

        });

}


function updateWebsite(websiteId, website) {

    return websiteModel.update({_id: websiteId},
        {$set: website});


}

function findWebsiteById(websiteId) {

    return websiteModel.findById(websiteId);

}

function findAllWebsites() {
    return websiteModel.find();

}

function deleteWebsite(userId,websiteId) {
    return websiteModel
        .remove({_id : websiteId})
        .then(function(status){
            return userModel
                .deleteWebsite(userId,websiteId);
        });

}

function createWebsiteForUser(userId,website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function(website){
            return userModel
                .addWebsite(userId, website._id);

        })

}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user : userId})
        .populate('_user')
        .exec();

    
}