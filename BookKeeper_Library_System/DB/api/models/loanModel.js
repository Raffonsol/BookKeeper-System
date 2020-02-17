'loan strict';
var sql = require('../../server.js');

var Loan = function (loan) {
    this.transactionId = null;
    this.bookId = null;
    this.memberAccount = loan.memberAccount;
    this.employeeId = loan.employeeId;
    this.isbn = loan.isbn;

    var today = new Date();
    this.dueDate = today.setDate(today.getDate() + loan.loanDuration);
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

    sql.query("SELECT * FROM book where isbn = ?", newLoan.isbn, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {

            newLoan.bookId = res[0].id;
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

                            sql.query("UPDATE bookunit SET inStore = false WHERE id=(SELECT id from bookunit WHERE bookId = ? AND inStore = true ORDER BY ID LIMIT 1)", newLoan.bookId, function (err, res) {

                                if (err) {
                                    console.log("error: ", err);
                                    result(err, null);
                                } else {
                                    console.log('loan id:', res.insertId);

                                    //result(null, res);
                                }
                            });
                            //result(null, res);
                        }
                    });
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
    sql.query("SELECT * FROM loan LEFT join book ON loan.bookId = book.id WHERE completed = false", function (err, res) {

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
    sql.query("SELECT COUNT(*) FROM loan WHERE completed = false", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('loans : ', res);
            result(null, {...res, count: res[0]['COUNT(*)']});
        }
    });
};
Loan.updateById = function (id, result) {
    sql.query("UPDATE loan SET completed = true WHERE id = ?", id, function (err, res) {
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