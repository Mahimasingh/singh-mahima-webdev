(function () {
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.findWebById = findWebById;

        function init() {
            websiteService
                .findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();

        function findWebById(website) {
            var website = websiteService.findWebsiteById(website._id);
            $location.url("/user/" + model.userId + "/website/" + website._id);
            return website;
        }
    }
})();