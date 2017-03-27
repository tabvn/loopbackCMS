'use strict';

module.exports = function (taxonomy) {


    /**
     * Get Taxonomies Tree hierarchy
     * @param {Function(Error)} callback
     */

    taxonomy.getTreeTaxonomy = function (filter, options, callback) {

        var results = [];

        taxonomy.find(filter, function (err, items) {
            if (err !== null) {
                callback(err);
            } else {
                if (items) {
                    results = taxonomy.getTree(JSON.parse(JSON.stringify(items)))
                }
                callback(null, results);
            }
        });


    };


    taxonomy.getTree = function (list) {

        var idAttr = "id";
        var parentAttr = "parentId";
        var childrenAttr = 'children';


        var treeList = [];
        var lookup = {};
        list.forEach(function (obj) {
            lookup[obj[idAttr]] = obj;
            obj[childrenAttr] = [];
        });
        list.forEach(function (obj) {
            if (obj[parentAttr] != null) {
                lookup[obj[parentAttr]][childrenAttr].push(obj);
            } else {
                treeList.push(obj);
            }
        });
        return treeList;
    }

};
