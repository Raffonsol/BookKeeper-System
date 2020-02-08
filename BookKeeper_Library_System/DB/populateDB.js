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
    var sql = "CREATE TABLE book (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
        "bookTitle VARCHAR(50) NOT NULL, " +
        "genre INT NOT NULL, " +
        "publicationDate DATE, " +
        "description VARCHAR(200)); " +
        "CREATE TABLE client (" +
        "firstName VARCHAR(50) NOT NULL," +
        "lastName VARCHAR(50) NOT NULL," +
        "email VARCHAR(100)," +
        "dateOfBirth DATE NOT NULL," +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY);" +
        "CREATE TABLE loan (" +
        "lastName VARCHAR(50)," +
        "bookTitle VARCHAR(50)," +
        "bookID INT," +
        "FOREIGN KEY (bookId) REFERENCES book(id)," +
        "dueDate DATE NOT NULL," +
        "loanId INT AUTO_INCREMENT PRIMARY KEY," +
        "clientId INT," +
        "FOREIGN KEY (clientId) REFERENCES client(id));" +
        "CREATE TABLE supplier (" +
        "supplierId INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
        "description VARCHAR(900)," +
        "supplierName VARCHAR(100));" +
        "CREATE TABLE weekly_overdue (" +
        "loanId INT," +
        "FOREIGN KEY (loanId) REFERENCES loan(loanID)," +
        "clientName VARCHAR(50) NOT NULL," +
        "loanCharges DOUBLE DEFAULT 10.00 NOT NULL," +
        "bookId INT," +
        "FOREIGN KEY (bookId) REFERENCES book(id))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
        console.log(sql);
    });
});