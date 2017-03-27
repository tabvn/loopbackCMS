'use strict';
var qt = require('quickthumb');

module.exports = function (Media) {
    var app = require('../../server/server');
    var publicContainer = "public";
    Media.upload = function (ctx, options, callback) {

        if (!options) options = {};
        ctx.req.params.container = publicContainer;

        Media.app.models.storage.upload(ctx.req, ctx.result, options, function (err, file) {

            if (err) {
                callback(err);
            } else {
                var keys = Object.keys(file.files);
                var mediaFiles = [];

                for (var i = 0; i < keys.length; i++) {
                    var fileItems = file.files[keys[i]];
                    fileItems.forEach(function (item) {
                        item.userId = ctx.req.accessToken.userId;
                        if (item.originalFilename !== "undefined") {
                            delete item.originalFilename;
                        }
                        mediaFiles.push(item);
                    });
                }


                Media.create(mediaFiles, function (err, obj) {
                    if (err !== null) {
                        callback(err);
                    } else {

                        if (obj !== null && obj.length) {

                            obj.forEach(function (m) {
                                createThumbnail(m);
                            });
                        }
                        callback(null, obj);
                    }
                });

            }
        });

    };


    Media.observe('before delete', function (ctx, next) {


        Media.app.models.mediaLink.destroyAll({mediaId: ctx.where.id}, function (err) {

            console.log(err);
        });

        Media.findById(ctx.where.id, function (err, file) {
            if (file && err == null) {
                Media.app.models.storage.removeFile(publicContainer, file.name, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });

            }


        });
        next();

    });


    function createThumbnail(media) {

        var imagesFileTypes = [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/gif"
        ];

        var indexValue = imagesFileTypes.indexOf(media.type);
        if (indexValue != -1) {
            var file_path = "./server/storage/" + media.container + "/" + media.name;


            if (typeof app.settings.storage.createThumbnails !== "undefined" && app.settings.storage.createThumbnails !== null) {

                var sizes = app.settings.storage.createThumbnails;


                sizes.forEach(function (options) {

                    var width = options.width;
                    var file_thumb_path = "./server/storage/" + media.container + "/thumbnail_" + width + "/" + media.name;

                    console.log(file_thumb_path);
                    var opt = {
                        src: file_path,
                        dst: file_thumb_path,
                        width: options.width,
                        height: options.height,
                        quality: 1
                    };


                    qt.convert(opt, function (err, image) {
                        console.log("An error converting image: ", err);

                    });
                });
            }

        }


    }


};
