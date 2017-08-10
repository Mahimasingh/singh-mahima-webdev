var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var db = require("../database");
var pageModel = mongoose.model('pageModel',pageSchema);
var websiteModel = require('../website/website.model.server')
pageModel.findAllPages = findAllPages;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.createPageForWebsite = createPageForWebsite;
pageModel.deletePage = deletePage;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidgetForPage = deleteWidgetForPage;
module.exports = pageModel;

function addWidget(pageId,widgetId) {

    return pageModel
        .findPageById(pageId)
        .then(function(page){
            page._widgets.push(widgetId);
            return page.save();
        });

}

function deleteWidgetForPage(pageId,widgetId) {

    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var index = page._widgets.indexOf(widgetId);
            page._widgets.splice(index,1);
            return page.save();

        });

}

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

        });

}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website : websiteId})
        .populate('_website')
        .exec();


}