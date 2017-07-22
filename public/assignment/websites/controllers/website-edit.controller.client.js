(function () {

    angular
        .module("WamApp")
        .controller("websiteEditController", websiteEditController)

    function websiteEditController(websiteService, $routeParams,$location) {
        var model = this;
        model.websiteId = $routeParams["websiteId"];

        model.updateWeb = updateWeb;
        model.deleteWeb = deleteWeb;
        model.findWebByUserId = findWebByUserId;
        model.findWebById = findWebById;
        model.userId = $routeParams["userId"];


        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        function updateWeb(website) {
            websiteService.updateWebsite(website._id, website);
            $location.url("/user/" + model.userId + "/website");
        }

        function deleteWeb(website){
            websiteService.deleteWebsite(website._id);
            $location.url("/user/" + model.userId + "/website");
        }

        function findWebByUserId(website) {
            var websites = websiteService.findWebsitesForUser(model.userId);

            return websites;
        }

        function findWebById(website) {
            var _website = websiteService.findWebsiteById(website._id);
            $location.url("/user/" + model.userId + "/website/" + _website._id +"/edit");
            return _website;
        }


    }

})();