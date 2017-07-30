(function () {
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController(websiteService, $routeParams,$location) {
        var model = this;
        model.createWebsite = createWebsite;
        model.findWebById = findWebById;

        model.userId = $routeParams.userId;
        model.widgetType = $routeParams.widgetType;

        function init() {
            websiteService.findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;

                })
        }
        init();

        function createWebsite(website) {
            websiteService
                .createWebsite(model.userId, website)
                .then(function () {
                    $location.url("/user/"+model.userId+"/website");
                });
        }

        function findWebById(website) {
            var _website = websiteService.findWebsiteById(website._id);
            $location.url("/user/" + model.userId + "/website/" + website._id);
            return _website;
        }
    }
})();