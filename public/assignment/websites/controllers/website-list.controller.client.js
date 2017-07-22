(function () {
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.findWebById = findWebById;

        function init() {
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }
        init();

        function findWebById(website) {
            var website = websiteService.findWebsiteById(website._id);
            $location.url("/user/" + model.userId + "/website/" + website._id +"/edit");
            return website;
        }
    }
})();