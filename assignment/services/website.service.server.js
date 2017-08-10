var app = require("../../express");
var websiteModel = require("../models/website/website.model.server");


app.get("/api/user/:userId/website",findWebsitesForUser);
app.get("/api/website/:websiteId",findWebsiteById);
app.post("/api/user/:userId/website",createWebsite);
app.delete("/api/user/:userId/website/:websiteId",deleteWebsite);
app.put("/api/website/:websiteId",updateWebsite);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function updateWebsite(req,res) {
    var websiteId = req.params.websiteId;
    var website = req.body;

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });



}

function deleteWebsite(req,res) {

    var websiteId = req.params.websiteId;
    var userId = req.params.userId;
    
    websiteModel
        .deleteWebsite(userId,websiteId)
        .then(function (status) {
            res.json(status);
            
        });

    

}
function findWebsiteById(req, res) {

    var websiteId = req.params.websiteId;

    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);

        });


}


function findWebsitesForUser(req,res){
    var userId = req.params.userId;

    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);

        })

    // var sites = [];
    //
    // for(var w in websites) {
    //     if(websites[w].developerId === userId) {
    //         sites.push(websites[w]);
    //     }
    // }
    //
    // res.json(sites);
}

function createWebsite(req,res) {
    var website = req.body;
    var userId = req.params.userId;

    websiteModel
        .createWebsiteForUser(userId,website)
        .then(function (website) {
            res.json(website);


        })
    // website.developerId = userId;
    // website._id = (new Date()).getTime() + "";
    // websites.push(website);
    // res.json(website);
}