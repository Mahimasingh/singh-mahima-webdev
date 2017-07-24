(function () {
        angular
            .module("WamApp")
            .controller("widgetEditController", widgetEditController);

        function widgetEditController($sce, $routeParams, widgetService, $location) {
            var model = this;
            model.userId = $routeParams.userId;
            model.websiteId = $routeParams.websiteId;
            model.pageId = $routeParams.pageId;
            model.widgetId = $routeParams.widgetId;
            model.deleteWid = deleteWid;
            model.uploadImage = uploadImage;


            function init(){
                model.widget = widgetService.findWidgetById(model.widgetId);

            }
            init();

            function deleteWid(widget){
                widgetService.deleteWidget(widget._id);
                $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");

            }

            function uploadImage(widget){

                widgetService.updateWidget(widget._id,widget);
                $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");

            }

        }
    }
)();