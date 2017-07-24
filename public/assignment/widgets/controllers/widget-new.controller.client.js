(function () {
        angular
            .module("WamApp")
            .controller("widgetNewController", widgetNewController);

        function widgetNewController($sce, $routeParams, widgetService, $location) {
            var model = this;
            model.userId = $routeParams.userId;
            model.websiteId = $routeParams.websiteId;
            model.pageId = $routeParams.pageId;
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
                   }
    }
)();