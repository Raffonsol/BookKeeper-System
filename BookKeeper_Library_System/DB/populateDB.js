var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "BookKeeper_System",
    multipleStatements: true

});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE book_information (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
        "bookTitle VARCHAR(50) NOT NULL, " +
        "genre INT NOT NULL, " +
        "publicationDate DATE, " +
        "description VARCHAR(200)); " +
        "CREATE TABLE test (" +
        "test INT NOT NULL);";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
        console.log(sql);
    });
});