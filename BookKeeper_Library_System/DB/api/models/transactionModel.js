'transaction strict';
var sql = require('../../server.js');

var Transaction = function (transaction) {

};


Transaction.getTransactionById = function (transactionId, result) {
    sql.query("SELECT * from memberaccount where id = ? ", transactionId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Transaction.getAllTransactions = function (result) {
    sql.query("Select * from memberaccount", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('transactions : ', res);
            result(null, res);
        }
    });
};

module.exports = Transaction;