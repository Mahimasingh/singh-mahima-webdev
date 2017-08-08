var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('pageModel',pageSchema);
var websiteModel = require('../website/website.model.server')
pageModel.findAllPages = findAllPages;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.createPageForWebsite = createPageForWebsite;
pageModel.deletePage = deletePage;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
module.exports = websiteModel;

function updatePage(pageId, page) {

    return pageModel.update({_id: pageId},
        {$set: page});


}

function findPageById(pageId) {

    return pageModel.findById(pageId);

}

function findAllPages() {
    return pageModel.find();

}

function deletePage(websiteId,pageId) {
    return pageModel
        .remove({_id : pageId})
        .then(function(status){
            return websiteModel
                .deletePage(websiteId,pageId);
        });

}

function createPageForWebsite(websiteId,page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function(page){
            return websiteModel
                .addPage(websiteId, page._id);

        })

}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website : websiteId})
        .populate('_website')
        .exec();


}