(function () {

    angular
        .module("WamApp")
        .controller("profileController", profileController)

    function profileController($routeParams, userService,$location) {
        var model = this;
        var userId = $routeParams["userId"];


        model.updateUser = updateUser;
        model.unregister = unregister;


        function init() {
            model.user = userService.findUserById(userId);
        }
        init();

        function updateUser(user) {
            userService.updateUser(user._id, user);
            $location.url("/profile/"+user._id);
            model.message = "Details Updated";
        }

        function unregister(user) {
            userService.deleteUser(user._id);
            $location.url("/login");


        }


    }

})();