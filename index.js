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


app.get("/", (req, res) => {
    const sql = "SELECT * FROM add_newspaper";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data: ', err);
            return res.status(500).json({ error: "Failed to fetch data" });
        }
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO add_newspaper (`publisher`, `newspaper_name`) VALUES (?, ?)";
    const values = [
       
        req.body.publisher,
        req.body.newspaper_name

    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({ error: "Failed to insert data" });
        }
        return res.json({ message: "Data inserted successfully", data });
    });
});


app.put('/update/:id', (req, res) => {
    const sql = "UPDATE add_newspaper SET `publisher`=?,`newspaper_name`=? WHERE id=? ";
    const values = [
        req.body.book_type_name,
        req.body.prefix
   
    ];

    const id=req.params.id;

    db.query(sql, [...values ,id], (err, data) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({ error: "Failed to insert data" });
        }
        return res.json({ message: "Data inserted successfully", data });
    });
});



app.delete('/usercrud/:id', (req, res) => {
    const sql = "DELETE FROM add_newspaper WHERE ID = ? ";
    const id=req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({ error: "Failed to insert data" });
        }
        return res.json({ message: "Data inserted successfully", data });
    });
});









