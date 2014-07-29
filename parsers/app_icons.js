"use strict";

(Foxalyzer.parser.register( "app_icons", "0.0.1",

    function( file_collection ) {
        var icon_features = [
            {
                "fileref": "/img/foo.png",
                "mimetype": "image/png",
                "x_size": "128",
                "y_size": "128",
                "dpi": "90",
                "color_depth": "24"
            },
            {
                "fileref": "/img/bar.png",
                "mimetype": "image/png",
                "x_size": "128",
                "y_size": "164",
                "dpi": "90",
                "color_depth": "24"
            }
        ];
        return [];
    }

))