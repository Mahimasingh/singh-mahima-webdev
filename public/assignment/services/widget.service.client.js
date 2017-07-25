(function () {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>This is an HTML Paragraph embedded in this page. Lorempizel is a great website <br></p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "790", "widgetType": "HEADING", "pageId": "222","size" : 1, "text": "Lorem ipsum"}
        ];


        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget" : deleteWidget
        };
        return api;

        function findWidgetsByPageId(pageId) {
            var _widgets = [];

            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    _widgets.push(widgets[w]);
                }
            }

            return _widgets;
        }



        function createWidget(pageId, widget){
            widget.pageId = pageId;
            widget._id = (new Date()).getTime() + "";
            widgets.push(widget);
            return widget;


        }

        // findWebsiteById(websiteId)

        function findWidgetById(widgetId){

            for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        // updateWebsite(websiteId, website)

        function updateWidget(widgetId, widget){
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets[w] = widget;
                    return;
                }
            }
            return null
        }

        // deleteWebsite(websiteId)

        function deleteWidget(widgetId){
            for(var w in widgets){
                var _widget = widgets[w];
                if(_widget._id === widgetId){
                    var index = widgets.indexOf(_widget);
                    if(index > -1){
                        widgets.splice(index,1);

                    }
                }
            }
            return widgets;
        }


    }
})();