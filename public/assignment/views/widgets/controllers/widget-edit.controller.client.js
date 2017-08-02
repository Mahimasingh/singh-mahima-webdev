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
            model.updateForWidget = updateForWidget;








            function init(){

                widgetService.findWidgetById(model.widgetId)
                    .then(function(response){

                        model.widget = response.data;
                        model.widgetType = model.widget.widgetType;

                    })

            }
            init();

            function deleteWid(widget){
                widgetService.deleteWidget(widget._id)
                    .then(function(response){

                        $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");


                    })

            }

            function uploadImage(widget){

                widgetService.updateWidget(widget._id,widget)
                    .then(function(response){
                        $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                    })


            }

            function updateForWidget(widget){
                widgetService.updateWidget(widget._id,widget)
                    .then(function(response){
                        $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                    })


            }



        }
    }
)();