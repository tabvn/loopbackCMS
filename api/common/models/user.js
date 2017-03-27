'use strict';

module.exports = function(User) {

    User.disableRemoteMethodByName('prototype.__create__roles');
    User.disableRemoteMethodByName('prototype.__delete__roles');
    User.disableRemoteMethodByName('prototype.__destroyById__roles'); // DELETE
    User.disableRemoteMethodByName('prototype.__updateById__roles'); // PUT


};
