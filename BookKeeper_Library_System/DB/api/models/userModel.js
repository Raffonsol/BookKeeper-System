'user strict';
var sql = require('../db.js');

var User = function (user) {
    this.email = user.email;
    this.phone = user.phone;
    this.createdBy = user.createdBy;

    // Database name will format first and last name to have proper casing and put them together
    this.name = user.firstName.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    ) + ' ' + user.lastName.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );

};

User.createUser = function (newUser, result) {
    var userID;
    console.log('newUser:', newUser);

    sql.query("INSERT INTO memberaccount set ?", newUser, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log('user id:', res.insertId);
            result(null, res);
        }
    });
};
User.getUserById = function (userId, result) {
    sql.query("SELECT * from memberaccount where id = ? ", userId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
User.getAllUsers = function (result) {
    sql.query("Select * from memberaccount", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('users : ', res);
            result(null, res);
        }
    });
};
User.updateById = function (id, user, result) {
    sql.query("UPDATE memberaccount SET name = ? WHERE id = ?", [user.name, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
User.remove = function (id, result) {
    sql.query("DELETE FROM memberaccount WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};

module.exports = User;