var Loan = require('../models/loanModel.js');

exports.list_all_loans = function(req, res) {
    Loan.getAllLoans(function(err, loan) {

        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', loan);
        res.send(loan);
    });
};
exports.count_active = function(req, res) {
    Loan.countAllActiveLoans(function(err, loan) {

        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', loan);
        res.send(loan);
    });
};
exports.create_a_loan = function(req, res) {
    var new_loan = new Loan(req.body);
    Loan.createLoan(new_loan, function(err, task) {

        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_loan = function(req, res) {
    Loan.getLoanById(req.params.loanId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_loan = function(req, res) {
    Loan.updateById(req.params.loanId, new Loan(req.body), function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_loan = function(req, res) {


    Loan.remove( req.params.loanId, function(err, loan) {
        if (err)
            res.send(err);
        res.json({ message: 'Loan successfully deleted' });
    });
};