(function () {

    angular
        .module("ProjApp")
        .config(configuration);
    function configuration($routeProvider,$httpProvider) {

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
    }
})();
