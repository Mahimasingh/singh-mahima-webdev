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

            pageService.findPageById(model.userId,model.websiteId,model.pageId)
                .then(function(response){
                    model.page = response.data;
                })
        }
        init();

        function updateForPage(page) {
            pageService.updatePage(model.userId,model.websiteId,page._id, page)
                .then(function(response){

                    $location.url("/user/" + model.userId + "/website/" + model.websiteId +"/page" );
                })

        }

        function deleteForPage(page){
            pageService.deletePage(model.userId,model.websiteId,page._id)
                .then(function(response){
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");

                               });

        }



        function findPageForId(page) {
            var _page = pageService.findPageById(page._id);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId +"/page");
            return _page;
        }


    }

})();