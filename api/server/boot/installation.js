'use strict';


module.exports = function (app) {


    var User = app.models.user;
    var Role = app.models.role;
    var RoleMapping = app.models.RoleMapping;


    RoleMapping.belongsTo(User);
    User.hasMany(RoleMapping, {foreignKey: 'principalId'});
    Role.hasMany(User, {through: RoleMapping, foreignKey: 'roleId'});

    User.find({limit: 1}, function (err, users) {

        if (err == null && users && users.length == 0) {
            createDefaultAdminUserRole();
        }
    });

    function createDefaultAdminUserRole() {

        User.create([
            {
                username: 'admin',
                email: 'toan@tabvn.com',
                password: 'admin',
                'firstName': 'Toan',
                'lastName': 'Nguyen Dinh'
            },
        ], function (err, users) {
            if (err) throw err;


            console.log("Created User: ", users);
            //create the admin role
            Role.findOne({where: {name: "administrator"}, limit: 1}, function (err, roleObj) {
                if (err !== null) {
                    return;
                }
                if (roleObj) {
                    roleObj.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: users[0].id
                    }, function (err, principal) {
                        console.log('Admin Role Create Principal:', principal);
                        // now it should be fine :)
                    });

                } else {
                    Role.create({
                        name: 'administrator'
                    }, function (err, role) {
                        if (err) throw err;

                        //make bob an admin
                        role.principals.create({
                            principalType: RoleMapping.USER,
                            principalId: users[0].id
                        }, function (err, principal) {
                            console.log('Created principal:', principal);

                            // now it should be fine :)
                        });
                    });
                }
            });


        });
    }

};

