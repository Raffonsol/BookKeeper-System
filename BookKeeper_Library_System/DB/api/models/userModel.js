'user strict';
var sql = require('../../server.js');

var User = function (user) {
    this.name = user.name;
    this.email = user.email;
    this.phoneNumber = user.phone;
    this.createdBy = user.createcreatedBy;

};

User.createUser = function (newUser, result) {
    var userID;
    console.log('newUser:', newUser);

    sql.query("SELECT * FROM employeeaccount WHERE username = ?", newUser.createdBy, function (err, res) {
console.log('res', res);
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            if (res.length >= 1) {
                newUser.createdBy = res[0].employeeId
            } else {
                console.log("error: not logged in");
                result(err, null);
            }
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

User.countAllUsers = function (result) {
    sql.query("SELECT COUNT(*) from memberaccount", function (err, res) {

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