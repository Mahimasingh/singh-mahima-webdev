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
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, website);
        }

        // findWebsiteById(websiteId)

        function findWebsiteById(websiteId){

            var url = "/api/website/" + websiteId;
            return $http.get(url)

        }

        // updateWebsite(websiteId, website)

        function updateWebsite(websiteId, website){

            var url = "/api/website/" + websiteId;
            return $http.put(url,website);
        }

        // deleteWebsite(websiteId)

        function deleteWebsite(userId,websiteId){

            var url="/api/user/"+ userId +"/website/" + websiteId;
            return $http.delete(url);

        }


    }
})();