(function () {
    angular
        .module("WamApp")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.findPageforId = findPageforId;


        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }
        init();

        function findPageforId(page) {
            var page = pageService.findPageById(page._id);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId +"/page" + page._id);
            return page;
        }
    }
})();