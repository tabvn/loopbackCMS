'use strict';

module.exports = function (User) {

    User.disableRemoteMethodByName('prototype.__create__roles');
    User.disableRemoteMethodByName('prototype.__delete__roles');
    User.disableRemoteMethodByName('prototype.__destroyById__roles'); // DELETE
    User.disableRemoteMethodByName('prototype.__updateById__roles'); // PUT


    /**
     * Find User's Friend
     * @param {string} id User Id
     * @param {number} limit Limit number of friends to show
     * @param {number} skip Skip items
     * @param {string} search search user's friend
     * @param {Function(Error, object)} callback
     */

    User.user_friends = function (id, limit, skip, search, callback) {


        console.log("search params:", search);

        var _limit = limit ? limit : 20;
        var _skip = skip ? skip : 0;

        var result = [];

        var users = [];



        var Friend = User.app.models.friend;

        var regexValue = '/' + id + '/';
        var filter = {skip: _skip, limit: _limit, where: {id: {regexp: regexValue}}};

        Friend.find(filter, function (err, items) {

            if (err !== null) {
                return callback(err);
            }



            if(items.length){
                items.forEach(function (item) {

                    item.users.forEach(function (userId) {

                        if(userId !== id){
                            users.push(userId);
                        }

                    });
                });
            }


            if(users.length){
                // do find all users object and set to result;

                var userFilter = {where: {and: [{id:{inq: users}}]}};


                if(typeof search !== "undefined" && search !== null && search !== ""){

                    var orConditionalFilter = [];

                    orConditionalFilter.push({username: {like: search}});
                    orConditionalFilter.push({firstName: {like: search}});
                    orConditionalFilter.push({lastName: {like: search}});
                    orConditionalFilter.push({email: {like: search}});
                    orConditionalFilter.push({username: {like: search}});

                    userFilter.where.and.push({or: orConditionalFilter});
                }

                User.find(userFilter, function (err, userObjects) {

                    if(err !== null){
                        return callback(err);
                    }

                    callback(null, userObjects);
                });


            }else{
                // if emtpty users that mean this user has no friend.

                callback(null, []);
            }


        });

        // TODO
        // callback(null, result);
    };


};
