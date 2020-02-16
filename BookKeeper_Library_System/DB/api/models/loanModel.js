'loan strict';
var sql = require('../../server.js');

var Loan = function (loan) {
    this.transactionId = null;
    this.bookId = loan.bookId;
    this.memberAccount = loan.memberAccount;
    this.employeeId = loan.employeeId;

    var today = new Date();
    this.dueDate = today.setDate(today.getDate() + loan.loanDays);
};

Loan.createLoan = function (newLoan, result) {
    var transactionID;
    console.log('newLoan:', newLoan);
    var transaction = {
        employeeId: newLoan.employeeId,
        memberId: newLoan.memberAccount,
        date: new Date().getDate(),
        time: new Date().getTime()
    };

    sql.query("INSERT INTO transaction set ?", transaction, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log('transaction id:', res.insertId);
            result(null, res);

            newLoan.transactionId = res.insertId;

            sql.query("INSERT INTO loan set ?", newLoan, function (err, res) {

                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    console.log('loan id:', res.insertId);
                    result(null, res);
                }
            });
        }
    });
};
Loan.getLoanById = function (loanId, result) {
    sql.query("SELECT * from loan where id = ? ", loanId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Loan.getAllLoans = function (result) {
    sql.query("Select * from loan", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('loans : ', res);
            result(null, res);
        }
    });
};
Loan.countAllActiveLoans = function (result) {
    sql.query("Select * from loan", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('loans : ', res);
            result(null, res);
        }
    });
};
Loan.updateById = function (id, loan, result) {
    sql.query("UPDATE loan SET name = ? WHERE id = ?", [loan.name, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Loan.remove = function (id, result) {
    sql.query("DELETE FROM memberaccount WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};

module.exports = Loan;