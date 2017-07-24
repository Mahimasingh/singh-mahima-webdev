(function () {
    angular
        .module("WamApp")
        .service("pageService", pageService);

    function pageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
            { "_id": "678", "name": "Post 4", "websiteId": "678", "description": "Lorem" },
            { "_id": "234", "name": "Post 5", "websiteId": "576", "description": "Lorem" },
            { "_id": "222", "name": "Post 6", "websiteId": "890", "description": "Lorem" }
        ];


        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage" : deletePage
        };
        return api;

        function findPageByWebsiteId(webId) {
            var sites = [];

            for(var w in pages) {
                if(pages[w].websiteId === webId) {
                    sites.push(pages[w]);
                }
            }

            return sites;
        }



        function createPage(webId, page) {
            new_id = (new Date()).getTime() + "";

            var new_page = {"_id" : new_id, "name" : page.name , "websiteId" : webId, "description" : page.description};
            pages.push(new_page);
            return;


        }



        function findPageById(pageId){

            for(var p in pages){
                if(pages[p]._id === pageId){
                    return pages[p];
                }
            }
            return null;
        }

        // updateWebsite(websiteId, website)

        function updatePage(pageId, page){
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages[p] = page;
                    return;
                }
            }
            return null
        }

        // deleteWebsite(websiteId)

        function deletePage(pageId){
            for(var p in pages){
                var _page = pages[p];
                if(_page._id === pageId){
                    var index = pages.indexOf(_page);
                    if(index > -1){
                        pages.splice(index,1);

                    }
                }
            }
            return pages;
        }


    }
})();