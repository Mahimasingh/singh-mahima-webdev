(function () {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService($http) {




        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget" : deleteWidget,
            "getWidgetTypes" : getWidgetTypes


        };
        return api;



        function findWidgetsByPageId(pageId) {

            var url ="/api/page/" + pageId + "/widget";
            return $http.get(url);

        }



        function createWidget(pageId, widget) {
            var url = "/api/assignment/page/" + pageId + "/widget";
            return $http.post(url, widget);
        }
        // findWebsiteById(websiteId)

        function findWidgetById(widgetId){

            var url = "/api/widget/" + widgetId;
                return $http.get(url);

        }

        // updateWebsite(websiteId, website)

        function updateWidget(widgetId, widget){

            var url = "/api/widget/" + widgetId;
            return $http.put(url,widget);
        }

        // deleteWebsite(websiteId)

        function deleteWidget(pageId,widgetId){

            var url = "/api/page/" + pageId +"/widget/" + widgetId;

            return $http.delete(url);
        }

        function getWidgetTypes() {
            var url = '/api/assignment/widgetTypes';

            return $http.get(url);
        }




    }
})();