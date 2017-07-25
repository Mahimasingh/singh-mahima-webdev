(function () {

    angular
        .module("WamApp")
        .controller("pageEditController", pageEditController);

    function pageEditController(pageService, $routeParams,$location) {
        var model = this;
        model.pageId = $routeParams["pageId"];

        model.updateForPage = updateForPage;
        model.deleteForPage = deleteForPage;

        model.findPageForId = findPageForId;
        model.websiteId = $routeParams["websiteId"];
        model.userId = $routeParams["userId"];


        function init() {

            model.page = pageService.findPageById(model.pageId);
        }
        init();

        function updateForPage(page) {
            pageService.updatePage(page._id, page);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId +"/page" );
        }

        function deleteForPage(page){
            pageService.deletePage(page._id);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }



        function findPageForId(page) {
            var _page = pageService.findPageById(page._id);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId +"/page");
            return _page;
        }


    }

})();