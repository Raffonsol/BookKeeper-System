'user strict';
var sql = require('../db.js');

var Book = function(book){
    this.title = book.title;
    this.author = book.author;
    this.genre = book.genre;
    this.publishDate = book.publishDate;
    this.edition = book.edition;
    this.shelf = book.shelf;
    this.isbn = book.isbn;
};
Book.createBook = function (newBook, result) {
    sql.query("INSERT INTO book set ?", newBook, function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Book.getBookById = function (bookId, result) {
    sql.query("SELECT * from book where id = ? ", bookId, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
Book.getAllBooks = function (result) {
    sql.query("Select * from book", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('books : ', res);

            result(null, res);
        }
    });
};
Book.updateById = function(id, book, result){
    sql.query("UPDATE books SET title = ? WHERE id = ?", [book.title, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
Book.remove = function(id, result){
    sql.query("DELETE FROM book WHERE id = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

module.exports = Book;