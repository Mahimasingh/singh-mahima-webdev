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
            pageService.findPageByWebsiteId(model.userId,model.websiteId)
                .then(function(pages){
                    model.pages = pages;
                })
        }
        init();

        function findPageforId(page) {
            var page = pageService.findPageById(page._id);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId +"/page/" + page._id);
            return page;
        }
    }
})();