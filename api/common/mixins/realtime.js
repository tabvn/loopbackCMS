var loopback = require('loopback');

var realtime = {
    //Publishing a event..
    publish: function (socket, options) {

        if (options) {
            var model = options.model;
            var method = options.method;
            var data = options.data;
            var modelId = options.modelId;
            if (method === 'POST') {
                //console.log('Posting new data');
                var name = '/' + model + '/' + method;

                socket.emit(name, data);
            }
            else {

                var name = '/' + model + '/' + modelId + '/' + method;
                socket.emit(name, data);
            }
        } else {
            throw 'Error: Option must be an object type';
        }
    }, //End Publish..

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
        var socket = Model.app.io;

        if (ctx.isNewInstance) {
            //Now publishing the data..
            realtime.publish(socket, {
                model: modelName,
                data: ctx.instance,
                method: 'POST'
            });
        } else {

            realtime.publish(socket, {
                model: modelName,
                data: ctx.instance,
                modelId: ctx.instance.id,
                method: 'PUT'
            });
        }
        next();
    }); //after save..


    Model.observe("before delete", function (ctx, next) {
        var socket = Model.app.io;

        realtime.publish(socket, {
            model: modelName,
            data: ctx.where.id,
            modelId: ctx.where.id,
            method: 'DELETE'
        });
        next();
    }); //before delete..


};




