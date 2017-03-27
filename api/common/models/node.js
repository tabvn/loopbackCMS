'use strict';

module.exports = function (node) {

    node.observe('before save', function (ctx, next) {
        if (ctx.options && ctx.options.skipTaxonomies) {
            return next();
        }

        if (ctx.instance) {
            // Create new Entity
        } else {

            // update Entity
            var data = JSON.parse(JSON.stringify(ctx.data));

            node.updateRelationData(ctx, data, "taxonomies", "taxonomyId", "taxonomy_node");
            node.updateRelationData(ctx, data, "images", "mediaId", "media_link");


        }
        return next();
    });


    node.observe('after delete', function (ctx, next) {

        node.destroyRelationData(ctx, "taxonomy_node");
        node.destroyRelationData(ctx, "media_link");

        next();
    });


    node.destroyRelationData = function (ctx, relationModel) {
        node.app.models[relationModel].destroyAll({refId: ctx.where.id, refType: ctx.Model.modelName}, function (err) {
            if (err !== null) {
                console.log(err);
            }
        });
    };

    node.updateRelationData = function (ctx, data, relationKey, idKey, relationModel) {

        if (typeof data[relationKey] !== "undefined" && data[relationKey] !== null && data[relationKey].length) {

            var items = [];

            if (data && data[relationKey]) {
                data[relationKey].forEach(function (item) {
                    var itemObject = {
                        refId: ctx.where.id,
                        refType: ctx.Model.modelName
                    };

                    itemObject[idKey] = item[idKey];
                    items.push(itemObject);

                });
            }

            if (items.length) {

                node.app.models[relationModel].destroyAll({
                    refId: ctx.where.id,
                    refType: ctx.Model.modelName
                }, function (err) {

                    if (err !== null) {
                        console.log("error ", err);
                    } else {
                        // assign category


                        node.app.models[relationModel].create(items, function (err, obj) {
                            if (err !== null) {
                                console.log(err);
                            }

                        });


                    }

                });
            }
        }else{

            node.app.models[relationModel].destroyAll({
                refId: ctx.where.id,
                refType: ctx.Model.modelName
            }, function (err) {
               if(err !== null){
                   console.log(err);
               }
            });
        }

    };


};
