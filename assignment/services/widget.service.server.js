var app = require("../../express");
var widgetModel = require("../models/widget/widget.model.server")


var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../public/uploads' });


app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId",updateWidget);
app.delete("/api/page/:pageId/widget/:widgetId",deleteWidget);
app.post("/api/assignment/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
app.put("/api/page/:pageId/widget",orderWidget);
app.get('/api/assignment/widgetTypes', findAllWidgetTypes);
app.post("/api/assignment/upload", uploadImage);


var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO","name" : "Gizmodo Champ!"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum","name" : "Lorem Champ!"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "name" : "Image Boss",
        "url": "http://lorempixel.com/400/200/","text" : "This picture belongs to lorempixel"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>This is an HTML Paragraph embedded in this page. Lorempizel is a great website <br></p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum","name" : "This is a Heading"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%","name" : "Youtube link",
        "url": "https://youtu.be/AM2Ivdi9c4E" , "text" : "This youtube video is so cool!"},
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>","name" : "Html Boy"},
    { "_id": "790", "widgetType": "HEADING", "pageId": "222","size" : 1, "text": "Lorem ipsum","name" : "Heading Champ!"}
];

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    /*  widget = getWidgetById(widgetId);
     widget.url = '/assignment/uploads/' + filename;
     var callbackUrl   = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId+"/IMAGE";
     */
    //res.redirect(callbackUrl);
    var savedUrl = '/assignment/uploads/'+filename;
    widgetModel.updateWidgetUrl(widgetId, savedUrl)
        .then(
            function (status) {

                var callbackUrl   = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/" + pageId + "/widget/" + widget._id;
                res.redirect(callbackUrl);
            }
        );

}


function orderWidget(req,res) {

    var initial = parseInt(req.query['startIndex']);
    var final = parseInt(req.query['endIndex']);


    widgetModel
        .reorderWidgets(pageId, initial, final)
        .then(
            function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.status(401).json(error);
            }
        );

}

function createWidget (req, res) {

    var pageId = req.params.pageId;
    var widget = req.body;

    widgetModel
        .createWidget(pageId, widget)
        .then(
            function (widget) {

                res.json(widget);
            },
            function (error) {

                res.status(401).json(error);
            }
        );
}

function findWidgetById(req,res) {

    widgetId = req.params.widgetId;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);

        });


}

function updateWidget(req,res) {

    widgetId = req.params.widgetId;
    widget = req.body;

    widgetModel
        .updateWidget(widgetId,widget)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteWidget(req,res) {

    widgetId = req.params.widgetId;
    pageId = req.params.pageId;

    widgetModel
        .deleteWidget(pageId,widgetId)
        .then(function (status) {
            console.log("The status is" + status);
            res.json(status);

        });


}

function findAllWidgetsForPage(req,res) {

    pageId = req.params.pageId;

    widgetModel
        .findAllWidgetsForPage(pageId)
        .sort({ order: 1 })
        .then(function (widgets) {
            res.json(widgets);

        })


}

var widgetTypes = [
    { "widgetType": "HEADING","text" : "HEADING"},
    { "widgetType": "IMAGE", "text" : "IMAGE"},
    { "widgetType": "YOUTUBE", "text" : "YOUTUBE"},
    { "widgetType": "HTML", "text" : "HTML"},
    { "widgetType" : "TEXT", "text" : "TEXT"}


];

function findAllWidgetTypes(req, res) {
    return res.json(widgetTypes);
}



