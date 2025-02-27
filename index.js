const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');
const multer = require('multer');
const XLSX = require('xlsx');
const cookie=require('cookie-parser');
//const session=require('express-session');
const bodyParser=require('body-parser');


const app = express();
app.use(bodyParser.json())
app.use(cookie());
app.use(cors());

app.use(express.json()); // To parse JSON bodies in requests

// app.use(session({
//     secret:'secret',
//     resave:false,
//     saveUninitialized:false,
//     cookie:{
//         secure:false,
//         MaxAge:100*60*60*24
//     }
// }))

const port = 8080;

const upload = multer({ dest: 'uploads/' });

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "librarydb",
    port:3307,
    waitForConnections: true,
    connectionLimit: 10,      // Limit the number of connections
    queueLimit: 0
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + db.threadId);
});

app.listen(port, () => {
    console.log("Server running on port 8080");
});









