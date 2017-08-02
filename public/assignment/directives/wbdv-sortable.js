(function () {
    angular
        .module("testModule", [])
        .directive("wbdvSortable", itemListDirective);


    function itemListDirective($http, $routeParams) {
        function linkFunction(scope, element) {
            var startIndex = -1;
            var endIndex = -1;
            element.sortable({
                start: function (event, ui) {
                    startIndex = $(ui.item).index();
                },
                stop: function (event, ui) {
                    endIndex = $(ui.item).index();
                    console.log([startIndex, endIndex]);
                    $http.put("/api/page/" + $routeParams.pageId + "/widget/start=" + startIndex + "&end=" + endIndex);
                }
            });
        }
        return {
           // templateUrl: "../views/widgets/templates/widget-list.view.client.html",
            link: linkFunction
        }
    }


})();