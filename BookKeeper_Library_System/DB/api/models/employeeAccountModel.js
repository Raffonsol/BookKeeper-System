'employeeAccount strict';
var sql = require('../../server.js');

var EmployeeAccount = function (employeeAccount) {
    this.name = employeeAccount.name.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
    this.jobDescription = employeeAccount.jobDescription;
    this.email = employeeAccount.email;
    this.phoneNumber = employeeAccount.phoneNumber;
    this.role = employeeAccount.role;
    this.username = employeeAccount.username;
    this.password = employeeAccount.password;

};

EmployeeAccount.createEmployeeAccount = function (newEmployeeAccount, result) {
    var employeeID;
    var roleID;
    // format entered name and role before querying
    newEmployeeAccount.name = newEmployeeAccount.name.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
    newEmployeeAccount.role = newEmployeeAccount.role.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );

    console.log('newEmployeeAccount:', newEmployeeAccount);
    //check if employee name exists
    sql.query("SELECT * FROM employee WHERE name = ?;", newEmployeeAccount.name, (err, res) => {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("query result: ", res);
            if (res.length > 0) {
                console.log("employee already exists. Creating account only");
                // there should only ever be one result
                employeeID = res[0].id;
            } else {
                sql.query("INSERT INTO employee set ?", newEmployeeAccount, function (err, res) {

                    if(err) {
                        console.log("error: ", err);
                        result(err, null);
                    }
                    else{
                        employeeID = res.insertId;
                        console.log('employee id:', res.insertId);
                    }
                });
            }

            // Query for role
            sql.query("SELECT * FROM role WHERE name = ?;", newEmployeeAccount.role, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    // role resulted, check if result has 1 item
                    if (res.length < 1) {
                        console.log('role not found: ', res);
                        result('role not found', null);
                    } else {
                        console.log('found role: ', res);
                        roleID = res[0].id;

                        // for each unit that was requested
                        for (let i = 0; i < newEmployeeAccount.units ; i++) {
                            // use found role to create employee unit
                            sql.query("INSERT INTO employeeaccount set ?", {...newEmployeeAccount, employeeId: employeeID, roleId: roleID}, function (err, res) {
                                if(err) {
                                    console.log("error: ", err);
                                    result(err, null);
                                }
                                else{
                                    employeeID = res.insertId;
                                    console.log('employeeaccount id:', res.insertId);
                                }
                            });
                        }
                        result(null, res.insertId);
                    }
                }
            });

        }
    });

};
EmployeeAccount.getEmployeeAccountById = function (employeeAccountId, result) {
    sql.query("SELECT * from employeeaccount where id = ? ", employeeAccountId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
EmployeeAccount.getEmployeeAccountByUsername = function (employeeUsername, result) {
    sql.query("SELECT e.username, e.password, r.roleName from employeeaccount e " +
        " INNER JOIN role r ON e.roleId = r.id where username = ?",
        employeeUsername, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
EmployeeAccount.getAllEmployeeAccounts = function (result) {
    sql.query("Select * from employeeaccount", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('employeeAccounts : ', res);
            result(null, res);
        }
    });
};
EmployeeAccount.updateById = function (id, employeeAccount, result) {
    sql.query("UPDATE employeeaccount SET name = ? WHERE id = ?", [employeeAccount.name, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
EmployeeAccount.remove = function (id, result) {
    sql.query("DELETE FROM employeeaccount WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};

module.exports = EmployeeAccount;