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

            model.updateForWidget = updateForWidget;








            function init(){

                widgetService.findWidgetById(model.widgetId)
                    .then(function(response){

                        model.widget = response.data;
                        model.widgetType = model.widget.type;

                    })

            }
            init();

            function deleteWid(widget){
                widgetService.deleteWidget(model.pageId,model.widgetId)
                    .then(function(response){

                        $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");


                    })

            }



            function updateForWidget(widget){
                widgetService.updateWidget(model.widgetId,widget)
                    .then(function(response){
                        $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                    })


            }



        }
    }
)();