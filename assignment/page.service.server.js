var app = require("../express");

app.get("/api/website/:websiteId/page",findPageByWebsiteId);
app.get("/api/page/:pageId",findPageById);
app.post("/api/website/:websiteId/page",createPage);
app.delete("/api/page/:pageId",deletePage);
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
    pageId = req.params.pageId;
    page = req.body;
    for(var p in pages) {
        if(pages[p]._id === pageId) {
            pages[p] = page;
            res.send(page);
        }
    }
    res.sendStatus(404);

}

function deletePage(req,res) {

    pageId = req.params.pageId;

    for(var p in pages){
        var _page = pages[p];
        if(_page._id === pageId){
            var index = pages.indexOf(_page);
            if(index > -1){
                pages.splice(index,1);

            }
        }
    }
    return res.send(pages);
}
function findPageById(req, res) {

    pageId = req.params.pageId;
    for(var p in pages){
        if(pages[p]._id === pageId){
            res.send(pages[p]);
        }
    }
    res.sendStatus(404);
}


function findPageByWebsiteId(req,res){
    var websiteId = req.params.websiteId;

    var _pages = [];

    for(var p in pages) {
        if(pages[p].websiteId === websiteId) {
            _pages.push(pages[p]);
        }
    }

    res.json(_pages);
}

function createPage(req,res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    page.websiteId = websiteId;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.json(page);
}