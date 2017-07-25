(function () {
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController(pageService, $routeParams,$location) {
        var model = this;
        model.createNewPage = createNewPage;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;

        function init() {
            model.websites = pageService.findPageByWebsiteId(model.websiteId);
        }
        init();

        function createNewPage(page) {

            var new_page = pageService.createPage(model.websiteId,page);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
            return new_page;
        }


    }
})();