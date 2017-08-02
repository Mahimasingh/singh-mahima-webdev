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
            model.createNewWidget = createNewWidget;
            model.widgetType = $routeParams.widgetType;

            function createNewWidget(widget) {

                widgetService.createWidget(model.pageId,widget,model.widgetType)
                    .then(function(response){

                        $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");

                    })

            }



        }
    }
)();