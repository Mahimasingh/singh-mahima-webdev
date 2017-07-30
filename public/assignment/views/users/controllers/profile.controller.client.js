(function () {

    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($routeParams, userService,$location) {
        var model = this;
        var userId = $routeParams["userId"];


        model.updateUser = updateUser;
        model.unregister = unregister;


        function init() {
            userService.findUserById(userId)
            .then(function (response) {
                model.user= response.data;

            });
        }
        init();

        function updateUser(user) {
            userService.updateUser(user._id, user);
            $location.url("/profile/"+user._id);
            model.message = "Details Updated";
        }

        function unregister(user) {
            userService.deleteUser(user._id)
                .then(function(response){
                    $location.url("/login");
                });



        }


    }

})();