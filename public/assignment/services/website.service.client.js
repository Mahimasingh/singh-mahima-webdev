(function () {
    angular
        .module("WamApp")
        .service("websiteService", websiteService);

    function websiteService($http) {



        var api = {
            "findWebsitesForUser": findWebsitesForUser,
            "createWebsite": createWebsite,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite,
            "findWebsiteById" : findWebsiteById
        };
        return api;

        function findWebsitesForUser(userId) {

            var url = "/api/user/" + userId + "/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        // createWebsite(userId, website)

        function createWebsite(userId, website) {
            var url = "/api/user/" + userId + "/website" + websiteId;
            return $http.post(url, website);
        }

        // findWebsiteById(websiteId)

        function findWebsiteById(userId, websiteId){

            var url = "/api/user/" + userId + "/website/" + websiteId;
            return $http.get(url);

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