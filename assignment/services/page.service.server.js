var app = require("../../express");
var pageModel = require("../models/page/page.model.server");

app.get("/api/website/:websiteId/page",findPageByWebsiteId);
app.get("/api/page/:pageId",findPageById);
app.post("/api/website/:websiteId/page",createPage);
app.delete("/api/website/:websiteId/page/:pageId",deletePage);
app.put("/api/page/:pageId",updatePage);

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
    { "_id": "678", "name": "Post 4", "websiteId": "678", "description": "Lorem" },
    { "_id": "234", "name": "Post 5", "websiteId": "576", "description": "Lorem" },
    { "_id": "222", "name": "Post 6", "websiteId": "890", "description": "Lorem" }
];

function updatePage(req,res) {
    var pageId = req.params.pageId;
    var page = req.body;
    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });

}

function deletePage(req,res) {

    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;

    pageModel
        .deletePage(websiteId,pageId)
        .then(function (status) {
            res.json(status);

        });



}

function findPageById(req, res) {

    pageId = req.params.pageId;

    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);

        });
}


function findPageByWebsiteId(req,res){
    var websiteId = req.params.websiteId;

    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages);

        })

}

function createPage(req,res) {
    var page = req.body;
    var websiteId = req.params.websiteId


    pageModel
        .createPageForWebsite(websiteId,page)
        .then(function (page) {
            res.json(page);


        })
}