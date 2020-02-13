var Transaction = require('../models/transactionModel.js');

exports.list_all_transactions = function(req, res) {
    Transaction.getAllTransactions(function(err, transaction) {

        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', transaction);
        res.send(transaction);
    });
};

exports.read_a_transaction = function(req, res) {
    Transaction.getTransactionById(req.params.transactionId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};