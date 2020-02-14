var EmployeeAccount = require('../models/employeeAccountModel.js');

exports.list_all_employeeAccounts = function(req, res) {
    EmployeeAccount.getAllEmployeeAccounts(function(err, employeeAccount) {

        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', employeeAccount);
        res.send(employeeAccount);
    });
};

exports.create_a_employeeAccount = function(req, res) {
    var new_employeeAccount = new EmployeeAccount(req.body);
    EmployeeAccount.createEmployeeAccount(new_employeeAccount, function(err, task) {

        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_employeeAccount = function(req, res) {
    EmployeeAccount.getEmployeeAccountById(req.params.employeeAccountId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_employeeAccount = function(req, res) {
    EmployeeAccount.updateById(req.params.employeeAccountId, new EmployeeAccount(req.body), function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_employeeAccount = function(req, res) {


    EmployeeAccount.remove( req.params.employeeAccountId, function(err, employeeAccount) {
        if (err)
            res.send(err);
        res.json({ message: 'Employeeaccount successfully deleted' });
    });
};