var app = require("../express");


var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../public/uploads' });


app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId",updateWidget);
app.delete("/api/widget/:widgetId",deleteWidget);
app.post("/api/page/:pageId/widget",createWidget);
app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
app.put("/api/page/:pageId/widget",orderWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);


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

    widget = getWidgetById(widgetId);

    if(widget == null){
        widget = createNewWidget(filename,pageId,width);
    }

    widget.url = '/uploads/'+filename;



    var callbackUrl   = "/assignment/home.html#!/user/"+userId+"/website/"+websiteId+"/page/" + pageId + "/widget/" + widget._id;

    res.redirect(callbackUrl);
}

function createNewWidget(filename,pageId,width) {
    var widget = {'_id' : (new Date()).getTime() + "",'widgetType' : 'IMAGE','url' : "/uploads/"+filename,'pageId' : pageId,'width' : width};
    widgets.push(widget);
    return widget;


}

function getWidgetById(widgetId){


    for(var w in widgets){

        if(widgets[w]._id === widgetId){

            return widgets[w];

        }

        else
            return null;


    }

}

function orderWidget(req,res) {


    startIndex = req.query.startIndex;
    endIndex = req.query.endIndex;

    console.log("Inside server order widgets. The start Index is" + startIndex + "The end Index is" + endIndex);

    pageId = req.params.pageId;
    widgets_for_pageid = giveArrayForPageId(pageId);
    effective_startIndex = giveArrayIndexForWidget(widgets_for_pageid[startIndex]._id);
    effective_endIndex = giveArrayIndexForWidget(widgets_for_pageid[endIndex]._id);

    console.log("The effective start index is" + effective_startIndex + "end Index is" + effective_endIndex);

    if(effective_endIndex > effective_startIndex){
        pushElementsLeft(res,effective_startIndex, effective_endIndex)
    }

    else if(effective_endIndex < effective_startIndex){
        pushElementsRight(res,effective_startIndex, effective_endIndex);
    }

    res.send(widgets);

}

function giveArrayForPageId(pageId) {

    var _widgets= [];
    for(var w in widgets) {
        if(widgets[w].pageId === pageId) {
            _widgets.push(widgets[w]);
        }
    }

    return _widgets;


}

function giveArrayIndexForWidget(widgetId) {

    for(var w in widgets){
        if(widgets[w]._id === widgetId){
            return w;

        }
    }



}


// For the case 1 2 3 4 5 6 --> 2 3 4 1 5 6


function pushElementsLeft(res,startIndex, endIndex) {

    for(var w=0 ; w < widgets.length; w++){

        if(w == startIndex){

            var element = widgets[w];
            while(w < endIndex){

                widgets[w] = widgets[w+1];
                w = w + 1;
            }
            widgets[endIndex]= element;
            break;
        }
    }
    console.log(widgets);
    res.send(widgets);

}


// For the case 1 2 3 4 5 6 --> 1 2 3 6 4 5


function pushElementsRight(res,startIndex,endIndex) {

    for(var w = widgets.length - 1; w >= 0; w--){
        if(w == startIndex){

            var element = widgets[w];
            while(w > endIndex){
                widgets[w] = widgets[w-1];
                w = w - 1;
            }
            widgets[endIndex] = element;
            break;
        }

    }
    console.log(widgets);
    res.send(widgets);

}

function createWidget(req,res) {

    pageId = req.params.pageId;
    widget = req.body;
    _widgetType = req.query.widgetType;
    widget.pageId = pageId;
    widget._id = (new Date()).getTime() + "";
    widget.widgetType = _widgetType;
    widgets.push(widget);
    res.json(widget);
    return;

}

function findWidgetById(req,res) {

    widgetId = req.params.widgetId;

    for(var w in widgets){
        if(widgets[w]._id === widgetId){
            res.send(widgets[w]);
            return;
        }
    }

    res.sendStatus(404);

}

function updateWidget(req,res) {

    widgetId = req.params.widgetId;
    widget = req.body;

    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            widgets[w] = widget;
            res.send(widgets[w]);
            return ;
        }
    }
}

function deleteWidget(req,res) {

    widgetId = req.params.widgetId;

    for(var w in widgets){
        var _widget = widgets[w];
        if(_widget._id === widgetId){
            var index = widgets.indexOf(_widget);
            if(index > -1){
                widgets.splice(index,1);

            }
        }
    }
    res.json(widgets);
    return;


}

function findAllWidgetsForPage(req,res) {

    pageId = req.params.pageId;

    var _widgets = [];

    for(var w in widgets) {
        if(widgets[w].pageId === pageId) {
            _widgets.push(widgets[w]);
        }
    }

    res.json(_widgets);

}



