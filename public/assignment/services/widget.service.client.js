(function () {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO","name" : "Gizmodo Champ!"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum","name" : "Lorem Champ!"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "name" : "Image Boss",
                "url": "http://lorempixel.com/400/200/","text" : "This picture belongs to lorempixel"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>This is an HTML Paragraph embedded in this page. Lorempizel is a great website <br></p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum","name" : "This is a Heading"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%","name" : "Youtube link",
                "url": "https://youtu.be/AM2Ivdi9c4E" , "text" : "This youtube video is so cool!"},
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>","name" : "Html Boy"},
            { "_id": "790", "widgetType": "HEADING", "pageId": "222","size" : 1, "text": "Lorem ipsum","name" : "Heading Champ!"}
        ];


        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget" : deleteWidget,
            "giveWidgetType" : giveWidgetType
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



        function createWidget(pageId, widget, widgetType){
            widget.pageId = pageId;
            widget._id = (new Date()).getTime() + "";
            widget.widgetType = widgetType;
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

        function giveWidgetType(widgetId){
            for(var w in widgets){
                var _widget = widgets[w];
                if(_widget._id === widgetId){
                    return _widget.widgetType;
                }
            }
            return null;
        }


    }
})();