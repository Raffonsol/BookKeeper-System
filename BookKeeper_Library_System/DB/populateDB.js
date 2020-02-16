var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "BookKeeper_System",
    multipleStatements: true

});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected, populating database with initial data");
    var sql = "SET FOREIGN_KEY_CHECKS = 0;" +

        "DROP TABLE IF EXISTS book, supplier, bookunit, role, employee, employeeaccount, memberaccount, loan, transaction;" +

        "CREATE TABLE book (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
        "isbn VARCHAR(11) NOT NULL, " +
        "title VARCHAR(150) NOT NULL," +
        "author VARCHAR(100) NOT NULL, " +
        "genre VARCHAR(100) NOT NULL, " +
        "publishDate DATE, " +
        "edition VARCHAR(100)," +
        "popularity INT," +
        "shelf INT);" +

        "CREATE TABLE supplier (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
        "name VARCHAR(50) NOT NULL," +
        "about VARCHAR(500)," +
        "website VARCHAR(2083));" +

        "CREATE TABLE bookunit (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
        "bookId INT," +
        "FOREIGN KEY (bookId) REFERENCES book(id)," +
        "supplierId INT NOT NULL," +
        "FOREIGN KEY (supplierId) REFERENCES supplier(id)," +
        "acquiringDate DATE); " +

        "CREATE TABLE role ( " +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
        "roleName VARCHAR(255) NOT NULL, " +
        "description VARCHAR(500), " +
        "accessLevel INT NOT NULL);" +

        "CREATE TABLE employee (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
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

        "CREATE TABLE memberaccount (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
        "createdBy INT, " +
        "FOREIGN KEY (createdBy) REFERENCES employee(id), " +
        "name VARCHAR(100) NOT NULL, " +
        "email VARCHAR(150), " +
        "phoneNumber BIGINT); " +

        "CREATE TABLE loan (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
        "transactionId INT," +
        "FOREIGN KEY (transactionId) REFERENCES memberaccount(id)," +
        "bookId INT," +
        "FOREIGN KEY (bookId) REFERENCES bookunit(id)," +
        "memberAccount INT, " +
        "FOREIGN KEY (memberAccount) REFERENCES loan(id), " +
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

        "INSERT INTO employee (`name`, `jobDescription`, `email`, `phoneNumber`) VALUES" +
        "('Paul', 'Librarian', 'paulthelibrarian@bookkeeper.com', null)," +
        "('Taylor', 'Manager', 'taylor_boss@bookkeeper.com', null)," +
        "('Sophia', 'IT Technician', 'sophia32@bookkeeper.com', null)," +
        "('guest', 'default', 'guest', null);" +

        "INSERT INTO role (`roleName`, `description`, `accessLevel`) VALUES" +
        "('admin', 'full system control', '0')," +
        "('librarian', 'manages books and users', '1')," +
        "('support', 'manages accounts and suppliers', '2')," +
        "('guest', 'read only access', '3');" +

        "INSERT INTO employeeaccount (`employeeId`, `roleId`, `username`, `password`) VALUES" +
        "(1, 2, 'paul', '123')," +
        "(2, 1, 'taylor', '123')," +
        "(3, 3, 'sophia', '123')," +
        "(4, 4, 'guest', '123');" +
        "";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
        console.log(sql);

        var index = require
    });
});