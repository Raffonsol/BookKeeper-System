'role strict';
var sql = require('../../server.js');

var Role = function (role) {

};

Role.getAllRoles = function (result) {
    sql.query("Select * from role", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('roles : ', res);
            result(null, res);
        }
    });
};

module.exports = Role;