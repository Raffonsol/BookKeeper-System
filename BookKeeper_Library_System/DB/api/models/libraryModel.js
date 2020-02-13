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
    this.supplier = book.supplier;
    this.units = book.units;
};
Book.createBook = function (newBook, result) {
    var bookID;
    var supplierID;
    console.log('newBook:', newBook);
    sql.query("SELECT * FROM book WHERE title = ?;", newBook.title, (err, res) => {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("query result: ", res);
            if (res.length > 0) {
                console.log("book already exists. Creating Units only");
                // there should only ever be one result
                bookID = res[0].id;
            } else {
                sql.query("INSERT INTO book set ?", newBook, function (err, res) {

                    if(err) {
                        console.log("error: ", err);
                        result(err, null);
                    }
                    else{
                        bookID = res.insertId;
                        console.log('book id:', res.insertId);
                    }
                });
            }

            // Query for supplier
            sql.query("SELECT * FROM supplier WHERE name = ?;", newBook.supplier, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    // supplier resulted, check if result has 1 item
                    if (res.length < 1) {
                        console.log('supplier not found: ', res);
                        result('supplier not found', null);
                    } else {
                        console.log('found supplier: ', res);
                        supplierID = res[0].id;

                        // for each unit that was requested
                        for (let i = 0; i < newBook.units ; i++) {
                            // use found supplier to create book unit
                            sql.query("INSERT INTO bookunit set ?", {bookId: bookID, supplierId: supplierID, acquiringDate: new Date()}, function (err, res) {
                                if(err) {
                                    console.log("error: ", err);
                                    result(err, null);
                                }
                                else{
                                    bookID = res.insertId;
                                    console.log('bookunit id:', res.insertId);
                                }
                            });
                        }
                        result(null, res.insertId);
                    }
                }
            });

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