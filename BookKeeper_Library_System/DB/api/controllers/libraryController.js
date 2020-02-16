var Book = require('../models/libraryModel.js');

exports.list_all_books = function(req, res) {
    Book.getAllBooks(function(err, book) {

        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', book);
        res.send(book);
    });
};

exports.count_books = function(req, res) {
    Book.countAllBooks(function(err, book) {
        if (err)
            res.send(err);
        res.send(book);
    });
};

exports.create_a_book = function(req, res) {
    var new_book = new Book(req.body);

    //handles null error
    if(!new_book.theBook.author || !new_book.theBook.title){

        res.status(400).send({ error:true, message: 'Please provide author/title' });

    }
    else{
        if (new_book.publishDate === '') new_book.publishDate = null;

        Book.createBook(new_book, function(err, task) {

            if (err)
                res.send(err);
            res.json(task);
        });
    }
};


exports.read_a_book = function(req, res) {
    Book.getBookById(req.params.bookId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_book = function(req, res) {
    Book.updateById(req.params.bookId, new Book(req.body), function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_book = function(req, res) {


    Book.remove( req.params.bookId, function(err, book) {
        if (err)
            res.send(err);
        res.json({ message: 'Book successfully deleted' });
    });
};