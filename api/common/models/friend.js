'use strict';

module.exports = function (friend) {


    friend.afterRemote("find", function (ctx, modelInstance, next) {


        var users = [];

        var results = JSON.parse(JSON.stringify(ctx.result));

        if (results && results.length) {

            for (var i = 0; i < results.length; i++) {

                users = users.concat(results[i].users);

            }

        }


        var filter = {where: {id: {inq: users}}};
        friend.app.models.user.find(filter, function (err, userObjects) {

            for (var i = 0; i < results.length; i++) {

                for (var j = 0; j < results[i].users.length; j++) {

                    var userId = results[i].users[j];

                    results[i].users[j] = findUserById(userObjects, userId);


                }


            }

            ctx.result = results;
            next();
        });


    });


};


function findUserById(users, userId) {

    for (var i = 0; i < users.length; i++) {
        if (users[i].id == userId) {

            return users[i];
        }

    }
}