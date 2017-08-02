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
            "deleteWidget" : deleteWidget


        };
        return api;



        function findWidgetsByPageId(pageId) {

            var url ="/api/page/" + pageId + "/widget";
            return $http.get(url);

        }



        function createWidget(pageId, widget,widgetType){

            var url = "/api/page/" + pageId + "/widget?widgetType=" + widgetType;
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

        function deleteWidget(widgetId){

            var url = "/api/widget/" + widgetType;

            return $http.delete(url);
        }




    }
})();