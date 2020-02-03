var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "BookKeeper_System"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE book_information (id INT AUTO_INCREMENT PRIMARY KEY, bookTitle VARCHAR(50), genre INT, publicationDate DATE, description VARCHAR(200))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});