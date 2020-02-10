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
        "title VARCHAR(150) NOT NULL," +
        "author VARCHAR(100), " +
        "genre INT NOT NULL, " +
        "publishDate DATE, " +
        "edition VARCHAR(100)," +
        "shelf INT NOT NULL);" +
        "CREATE TABLE bookunit (" +
        "isbn VARCHAR(11) NOT NULL PRIMARY KEY," +
        "bookId INT," +
        "FOREIGN KEY (bookId) REFERENCES book(id)," +
        "supplierId INT," +
        "FOREIGN KEY (supplierId) REFERENCES supplier(id)," +
        "acquiringDate DATE); " +
        "CREATE TABLE supplier (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
        "name VARCHAR(50) NOT NULL," +
        "about VARCHAR(500)," +
        "website VARCHAR(2083));" +
        "CREATE TABLE loan (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
        "transactionId INT," +
        "FOREIGN KEY (transactionId) REFERENCES transaction(id)," +
        "isbn VARCHAR(11)," +
        "FOREIGN KEY (isbn) REFERENCES bookunit(isbn)," +
        "dueDate DATE NOT NULL," +
        "extensions DATE);" +
        "CREATE TABLE transaction (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
        "employeeId INT, " +
        "FOREIGN KEY (employeeId) REFERENCES employee(id), " +
        "memberId INT," +
        "FOREIGN KEY (memberId) REFERENCES memberaccount(id), " +
        "date DATE NOT NULL, " +
        "time TIME NOT NULL);" +
        "CREATE TABLE memberaccount (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
        "createdBy INT, " +
        "FOREIGN KEY (createdBy) REFERENCES employee(id), " +
        "loans INT, " +
        "FOREIGN KEY (loans) REFERENCES loan(id), " +
        "transactions INT, " +
        "FOREIGN KEY (transactions) REFERENCES transactions(id), " +
        "name VARCHAR(100) NOT NULL, " +
        "email VARCHAR(150), " +
        "phoneNumber BIGINT); " +
        "CREATE TABLE employee (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
        "account INT, " +
        "FOREIGN KEY (account) REFERENCES employeeaccount(id), " +
        "name VARCHAR(100) NOT NULL, " +
        "jobDescription VARCHAR(500), " +
        "email VARCHAR(150), " +
        "phoneNumber BIGINT); " +
        "CREATE TABLE employeeaccount (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
        "employeeId INT, " +
        "FOREIGN KEY (employeeId) REFERENCES employee(id), " +
        "roleId INT, " +
        "FOREIGN KEY (roleId) REFERENCES role(id), " +
        "username VARCHAR (100) NOT NULL, " +
        "password VARCHAR(255) NOT NULL);" +
        "CREATE TABLE role ( " +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
        "roleName VARCHAR(255) NOT NULL, " +
        "description VARCHAR(500), " +
        "accessLevel INT NOT NULL);";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
        console.log(sql);
    });
});