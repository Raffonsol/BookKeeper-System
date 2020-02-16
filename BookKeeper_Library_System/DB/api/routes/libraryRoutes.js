'use strict';
module.exports = function(app) {
    var books = require('../controllers/libraryController');
    var user = require('../controllers/userController');
    var supplier = require('../controllers/supplierController');
    var loan = require('../controllers/loanController');
    var employeeAccount = require('../controllers/employeeAccountController');
    var transaction = require('../controllers/transactionController');
    var role = require('../controllers/roleController');

    // book Routes
    app.route('/books')
        .get(books.list_all_books)
        .post(books.create_a_book);

    app.route('/books/:bookId')
        .get(books.read_a_book)
        .put(books.update_a_book)
        .delete(books.delete_a_book);

    app.route('/books/count')
        .get(books.count_books);

    // user Routes
    app.route('/users')
        .get(user.list_all_users)
        .post(user.create_a_user);

    app.route('/users/:userId')
        .get(user.read_a_user)
        .put(user.update_a_user)
        .delete(user.delete_a_user);

    // app.route('/users/count')
    //     .get(user.count_users);

    // supplier Routes
    app.route('/suppliers')
        .get(supplier.list_all_suppliers)
        .post(supplier.create_a_supplier);

    app.route('/suppliers/:supplierId')
        .get(supplier.read_a_supplier)
        .put(supplier.update_a_supplier)
        .delete(supplier.delete_a_supplier);

    // app.route('/suppliers/count')
        // .get(supplier.count_suppliers);

    // loan Routes
    app.route('/loans')
        .get(loan.list_all_loans)
        .post(loan.create_a_loan);

    app.route('/loans/:loanId')
        .get(loan.read_a_loan)
        .put(loan.update_a_loan)
        .delete(loan.delete_a_loan);

    // app.route('/loans/active')
        // .get(loan.count_active);

    // employeeAccount Routes
    app.route('/employeeAccounts')
        .get(employeeAccount.list_all_employeeAccounts)
        .post(employeeAccount.create_a_employeeAccount);

    app.route('/employeeAccounts/:employeeAccountId')
        .get(employeeAccount.read_a_employeeAccount)
        .put(employeeAccount.update_a_employeeAccount)
        .delete(employeeAccount.delete_a_employeeAccount);

    app.route('/employeeAccounts/validate/:employeeUsername')
        .get(employeeAccount.read_employeeAccount_from_username);

    // transaction Routes
    app.route('/transactions')
        .get(transaction.list_all_transactions);

    app.route('/transactions/:transactionId')
        .get(transaction.read_a_transaction);

    // role Route
    app.route('/roles')
        .get(role.list_all_roles);
};