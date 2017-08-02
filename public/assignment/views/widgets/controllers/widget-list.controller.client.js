(function () {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($sce, $routeParams, widgetService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getTrustedHtml = getTrustedHtml;
        model.getWidgetTemplateUrl = getWidgetTemplateUrl;

        // $(".widget-list").sortable({
        //     axis: y
        // });

        widgetService.findWidgetsByPageId(model.pageId)
            .then(function (response) {
                model.widgets = response.data;

            })


        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var _id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + _id;
            return $sce.trustAsResourceUrl(url);


        }


        function getTrustedHtml(html){
            return $sce.trustAsHtml(html);
        }

        function getWidgetTemplateUrl(widgetType){
            var url = 'widgets/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }
    }
}
)();