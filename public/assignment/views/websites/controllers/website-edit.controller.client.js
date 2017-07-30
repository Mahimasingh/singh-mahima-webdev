(function () {

    angular
        .module("WamApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController(websiteService, $routeParams,$location) {
        var model = this;
        model.websiteId = $routeParams["websiteId"];

        model.updateWeb = updateWeb;
        model.deleteWeb = deleteWeb;
        model.findWebByUserId = findWebByUserId;
        model.findWebById = findWebById;
        model.userId = $routeParams["userId"];


        function init() {
            websiteService.findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;

                });
            websiteService.findWebsiteById(model.userId,model.websiteId)
                .then(function(response){
                    model.website = response.data;
                })
        }
        init();

        function updateWeb(website) {
            websiteService.updateWebsite(model.userId,website._id, website)
                .then(function(response){
                    $location.url("/user/" + model.userId + "/website");
                });

        }

        function deleteWeb(website){
            websiteService.deleteWebsite(model.userId,website._id)
                .then(function(response){
                    $location.url("/user/" + model.userId + "/website");
                })

        }

        function findWebByUserId(website) {
            var websites = websiteService.findWebsitesForUser(model.userId);

            return websites;
        }

        function findWebById(website) {
            var _website = websiteService.findWebsiteById(website._id);
            $location.url("/user/" + model.userId + "/website/" + _website._id +"/edit");
            return _website;
        }


    }

})();