(function () {
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController(websiteService, $routeParams,$location) {
        var model = this;
        model.createNewWebsite = createNewWebsite;
        model.findWebById = findWebById;

        model.userId = $routeParams.userId;
        model.widgetType = $routeParams.widgetType;

        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }
        init();

        function createNewWebsite(website) {

            var web = websiteService.createWebsite(model.userId,website);
            $location.url("/user/" + model.userId + "/website");
        }

        function findWebById(website) {
            var _website = websiteService.findWebsiteById(website._id);
            $location.url("/user/" + model.userId + "/website/" + website._id);
            return _website;
        }
    }
})();