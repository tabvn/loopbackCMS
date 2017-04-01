var loopback = require('loopback');
var checked = {};

var realtime = {


    send: function (app, options) {


        var connections = null;


        var socket = app.io;
        if (typeof socket.sockets !== "undefined" && typeof socket.sockets.connected !== "undefined") {
            connections = socket.sockets.connected;
        }

        if (connections !== null) {
            var connectionKeys = Object.keys(connections);

            for (var i = 0; i < connectionKeys.length; i++) {
                var socketSession = connections[connectionKeys[i]];


                //  console.log(socketSession);

                this.checkAccessAndSend(app, socketSession, options);
            }
        }


    }, //End send..

    checkAccessAndSend: function (app, socket, options) {

        var names = [];

        var userId = socket.client.userId;
        var checkKey = "model:" + options.model + "_method:" + options.method;

        checkKey += userId ? "_user:" + userId : "_user:everyone";
        checkKey += typeof options.modelId !== "undefined" ? "_modelId:" + options.modelId : "_modelId:null";

        names.push('/' + options.model + '/' + options.method);
        if (options.modelId) {
            names.push('/' + options.model + '/' + options.modelId + '/' + options.method);
        }

        if (typeof checked[checkKey] !== "undefined" && checked[checkKey]) {
            // passed and able access this model ID, now send him the socket data

            console.log("ACL Already checked and passed");

            for (var i = 0; i < names.length; i++) {
                socket.emit(names[i], options.data);
            }


        } else {

            var at = {
                model: options.model,
                property: 'findById',
                accessType: 'READ',
                accessToken: socket.client.accessToken,
                method: "find"
            };
            if (typeof options.modelId !== "undefined") {
                at.modelId = options.modelId;
            }


            app.models.ACL.checkAccessForContext(at, function (err, access) {
                if (err !== null) {
                    console.log("Error");
                }
                var isAllowed = access.isAllowed();
                checked[checkKey] = isAllowed;
                if (isAllowed) {
                    for (var i = 0; i < names.length; i++) {
                        socket.emit(names[i], options.data);
                    }
                }


            });

        }


    },
    isEmpty: function (obj) {
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        if (obj == null) return true;

        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        for (var key in obj) {
            if (this.hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }
};

module.exports = function (Model, options) {
    'use strict';

    var modelName = Model.modelName;

    Model.observe('after save', function (ctx, next) {
        var app = Model.app;

        var idKey = "id";
        if (typeof ctx.Model.definition._ids[0].name !== "undefined") {
            idKey = ctx.Model.definition._ids[0].name;
        }

        if (ctx.isNewInstance) {

            /*realtime.send(app, {
             model: modelName,
             data: ctx.instance,
             modelId: ctx.instance[idKey],
             method: 'POST'
             });*/

            Model.findById(ctx.instance[idKey], function (err, modelObject) {

                if (err === null && modelObject) {
                    realtime.send(app, {
                        model: modelName,
                        data: modelObject,
                        modelId: ctx.instance[idKey],
                        method: 'POST'
                    });
                }
            });

        } else {

            realtime.send(app, {
                model: modelName,
                data: ctx.instance,
                modelId: ctx.instance[idKey],
                method: 'PUT'
            });
        }
        next();
    }); //after save..


    Model.observe("before delete", function (ctx, next) {
        var app = Model.app;

        var idKey = "id";
        if (typeof ctx.Model.definition._ids[0].name !== "undefined") {
            idKey = ctx.Model.definition._ids[0].name;
        }

        realtime.send(app, {
            model: modelName,
            data: ctx.where[idKey],
            modelId: ctx.where[idKey],
            method: 'DELETE'
        });
        next();
    }); //before delete..


};




