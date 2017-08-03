(function () {
    angular
        .module("WamApp")
        .service("pageService", pageService);

    function pageService($http) {




        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage" : deletePage
        };
        return api;

        function findPageByWebsiteId(userId,webId) {

            var url = "/api/website/" + webId + "/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }



        function createPage(userId,webId, page) {
            var url = "/api/website/" + webId +"/page";
            return $http.post(url, page);

        }



        function findPageById(userId,websiteId,pageId){

            var url = "/api/page/" + pageId;
            return $http.get(url);

        }

        // updateWebsite(websiteId, website)

        function updatePage(userId,websiteId,pageId, page){

            var url = "/api/page/" + pageId;
            return $http.put(url,page);

        }

        // deleteWebsite(websiteId)

        function deletePage(userId,websiteId,pageId){

            var url="/api/page/" + pageId;
            return $http.delete(url);

        }


    }
})();