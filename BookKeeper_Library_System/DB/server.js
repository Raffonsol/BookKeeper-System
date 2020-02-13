var cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(cors());


var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
});

con.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS BookKeeper_System", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});

app.listen(port);

console.log('Library API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/libraryRoutes'); //importing route
routes(app); //register the route