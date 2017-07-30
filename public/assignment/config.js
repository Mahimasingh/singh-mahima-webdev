(function () {

    angular
        .module("WamApp")
        .config(configuration);

    function configuration($routeProvider,$httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
        $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';

        $routeProvider

            .when("/", {
                templateUrl: "home/home.view.client.html",
                controller : "homeController",
                controllerAs : "model"

            })

            .when("/login", {
                templateUrl: "views/users/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/users/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/profile/:userId", {
                templateUrl: "views/users/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            // website routes
            .when("/user/:userId/website", {
                templateUrl: "views/websites/template/websites-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/new", {
                templateUrl: "views/websites/template/websites-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId", {
                templateUrl: "views/websites/template/websites-edit.view.client.html",
                controller: "websiteEditController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page", {
                templateUrl: "views/pages/templates/page-list.view.client.html",
                controller: "pageListController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page/new", {
                templateUrl: "views/pages/templates/page-new.view.client.html",
                controller: "pageNewController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page/:pageId", {
                templateUrl: "views/pages/templates/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs: "model"
            })


            .when("/user/:userId/website/:websiteId/page/:pageId/widget", {
                templateUrl: "views/widgets/templates/widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs: "model"
            })


            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new", {
                templateUrl: "views/widgets/templates/widget-chooser.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model"
            })




            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", {
                templateUrl: "views/widgets/templates/widget-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new/:widgetType", {
                templateUrl: "views/widgets/templates/widget-new.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model"
            })








    }
})();