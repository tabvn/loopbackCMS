'use strict';

module.exports = function (Role) {

    Role.validatesUniquenessOf('name', {message: 'role name is not unique'});

};
