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
            pageService.findPageByWebsiteId(model.userId,model.websiteId)
                .then(function (pages) {

                    model.pages = pages;

                })
        }
        init();



        function createNewPage(page) {

            pageService.createPage(model.userId,model.websiteId,page)
                .then(function(){
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");

                })


        }


    }
})();