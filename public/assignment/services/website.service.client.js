(function () {
    angular
        .module("WamApp")
        .service("websiteService", websiteService);

    function websiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            "findWebsitesForUser": findWebsitesForUser,
            "createWebsite": createWebsite,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite,
            "findWebsiteById" : findWebsiteById
        };
        return api;

        function findWebsitesForUser(userId) {
            var sites = [];

            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    sites.push(websites[w]);
                }
            }

            return sites;
        }

        // createWebsite(userId, website)

        function createWebsite(userId, website){


                    website.developerId = userId;
                    website._id = (new Date()).getTime() + "";
                    websites.push(website);
                    return website;


        }

        // findWebsiteById(websiteId)

        function findWebsiteById(websiteId){

            for(var w in websites){
                if(websites[w]._id === websiteId){
                    return websites[w];
                }
            }
            return null;
        }

        // updateWebsite(websiteId, website)

        function updateWebsite(websiteId, website){
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    websites[u] = website;
                    return;
                }
            }
            return null
        }

        // deleteWebsite(websiteId)

        function deleteWebsite(websiteId){
            for(var w in websites){
                var _website = websites[w];
                if(_website._id === websiteId){
                    var index = websites.indexOf(_website);
                    if(index > -1){
                        websites.splice(index,1);

                    }
                }
            }
            return websites;
        }


    }
})();