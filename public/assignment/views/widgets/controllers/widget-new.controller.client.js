(function () {
        angular
            .module("WamApp")
            .controller("widgetNewController", widgetNewController);

        function widgetNewController($routeParams, widgetService, $location) {
            var model = this;
            model.userId = $routeParams.userId;
            model.websiteId = $routeParams.websiteId;
            model.pageId = $routeParams.pageId;
            //model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.createWidget = createWidget;
            model.widgetType = $routeParams.widgetType;

            function init() {



                fetchWidgetTypes();
            }
            init();

            function createWidget(widgetType) {
                widgetService
                    .createWidget(model.pageId, {type: widgetType})
                    .then(function (response) {
                        var widget = response.data;
                        $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id);
                    });
            }
            function fetchWidgetTypes () {
                widgetService.getWidgetTypes()
                    .then(
                        function (response) {
                            model.widgetTypes = response.data;
                        }
                    );
            }





        }
    }
)();