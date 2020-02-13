'use strict';
module.exports = function(app) {
    var library = require('../controllers/libraryController');

    // todoList Routes
    app.route('/books')
        .get(library.list_all_books)
        .post(library.create_a_book);

    app.route('/books/:bookId')
        .get(library.read_a_book)
        .put(library.update_a_book)
        .delete(library.delete_a_book);
};