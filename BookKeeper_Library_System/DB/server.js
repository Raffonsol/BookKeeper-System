var cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(cors());

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const { exec } = require('child_process');

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS BookKeeper_System", function (err, result) {
        if (err) throw err;
        console.log("Database created");


// Prompt user to input data in console.
// When user input data and click enter key.
        readline.question(`Would you like to initialize the database? (y/n)`, (name) => {
            // User input exit.
            if (name === 'y') {
                // Program exit.
                exec('node populateDB', (err, stdout, stderr) => {
                    if (err) {
                        //some err occurred
                        console.error(err)
                    } else {
                        // the *entire* stdout and stderr (buffered)
                        console.log(`stdout: ${stdout}`);
                        console.log(`stderr: ${stderr}`);
                    }
                });
            }
        });
    });
});

app.listen(port);

console.log('Library API server started on: ' + port);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/libraryRoutes'); //importing route
routes(app); //register the route

