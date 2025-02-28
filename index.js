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


// Add Book Type

app.get("/api/book_type_data", (req, res) => {
    const sql = "SELECT * FROM add_book_type";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data: ', err);
            return res.status(500).json({ error: "Failed to fetch data" });
        }
        return res.json(data);
    });
});

app.post('/api/add_book_type', (req, res) => {
    const sql = "INSERT INTO add_book_type (`book_type_name`, `prefix`) VALUES (?, ?)";
    const values = [
       
        req.body.book_type_name,
        req.body.prefix

    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({ error: "Failed to insert data" });
        }
        return res.json({ message: "Data inserted successfully", data });
    });
});


app.put('/api/update_book_type/:id', (req, res) => {
    const sql = "UPDATE add_book_type SET `book_type_name`=?,`prefix`=? WHERE id=? ";
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



app.delete('/api/delete_book/:id', (req, res) => {
    const sql = "DELETE FROM add_book_type WHERE ID = ? ";
    const id=req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({ error: "Failed to insert data" });
        }
        return res.json({ message: "Data inserted successfully", data });
    });
});







// Add Newspaper
app.get("/api/newspaper", (req, res) => {
    const sql = "SELECT * FROM add_newspaper";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data: ', err);
            return res.status(500).json({ error: "Failed to fetch data" });
        }
        return res.json(data);
    });
});

app.post('/api/create', (req, res) => {
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


app.put('/api/update/:id', (req, res) => {
    const sql = "UPDATE add_newspaper SET `publisher`=?,`newspaper_name`=? WHERE id=? ";
    const values = [
        req.body.publisher,
        req.body.newspaper_name
   
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



app.delete('/api/usercrud/:id', (req, res) => {
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


// Add New Books

app.get("/api/new_book_data", (req, res) => {
    const sql = "SELECT * FROM add_new_books";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data: ', err);
            return res.status(500).json({ error: "Failed to fetch data" });
        }
        return res.json(data);
    });
});

app.post('/api/add', (req, res) => {
    const sql = `INSERT INTO add_new_books 
    (library_id, book_type, num_copies, book_code, procurement_date, author, book_name, series, edition, place_of_publication, 
    publisher, year_of_publication, num_pages, isbn_no, source, class_no, book_no, call_no, status, library_name, 
    document_category, almirah, amount, book_rack_no, subject, procurement_price, bill_no, bill_date, remark, genre, 
    publication_type, version, recommended_classes, restricted_classes, circulation_date, aging_of_book, book_location, 
    catalogue_no, language_name, vendor_name, volume_no, keywords, room_no, shelf_no, row_no, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  NOW(), NOW())`;

    const values = [
        req.body.library_id,
        req.body.book_type,
        req.body.num_copies,
        req.body.book_code,
        req.body.procurement_date,
        req.body.author,
        req.body.book_name,
        req.body.series,
        req.body.edition,
        req.body.place_of_publication,
        req.body.publisher,
        req.body.year_of_publication,
        req.body.num_pages,
        req.body.isbn_no,
        req.body.source,
        req.body.class_no,
        req.body.book_no,
        req.body.call_no,
        req.body.status,
        req.body.library_name,
        req.body.document_category,
        req.body.almirah,
        req.body.amount,
        req.body.book_rack_no,
        req.body.subject,
        req.body.procurement_price,
        req.body.bill_no,
        req.body.bill_date,
        req.body.remark,
        req.body.genre,
        req.body.publication_type,
        req.body.version,
        req.body.recommended_classes,
        req.body.restricted_classes,
        req.body.circulation_date,
        req.body.aging_of_book,
        req.body.book_location,
        req.body.catalogue_no,
        req.body.language_name,
        req.body.vendor_name,
        req.body.volume_no,
        req.body.keywords,
        req.body.room_no,
        req.body.shelf_no,
        req.body.row_no
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({ error: "Failed to insert data", details: err.sqlMessage });
        }
        return res.json({ message: "Data inserted successfully", values });
    });
});





app.put('/api/update_new_book/:id', (req, res) => {
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



app.delete('/api/delete_new_books/:id', (req, res) => {
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




//Spine Labels


app.get("/api/spine_labels_data", (req, res) => {
    const sql = "SELECT * FROM spine_labels";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data: ', err);
            return res.status(500).json({ error: "Failed to fetch data" });
        }
        return res.json(data);
    });
});

app.post('/api/spine_labels', (req, res) => {
    const sql = "INSERT INTO spine_labels (`book_type`, `book_no_from`,`book_no_to`,`created_at`) VALUES (?, ?,?,NOW())";
    const values = [
       
        req.body.book_type,
        req.body.book_no_from,
        req.body.book_no_to

    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({ error: "Failed to insert data" });
        }
        return res.json({ message: "Data inserted successfully", data });
    });
});


app.put('/api/update_spine_labels/:id', (req, res) => {
    const sql = "UPDATE spine_labels SET `book_type`=?,`book_no_from`=?,`book_no_to` WHERE id=? ";
    const values = [
        req.body.book_type_name,
        req.body.book_no_from,
        req.body.book_no_to
   
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



app.delete('/api/delete_spine_labels/:id', (req, res) => {
    const sql = "DELETE FROM spine_labels WHERE ID = ? ";
    const id=req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({ error: "Failed to insert data" });
        }
        return res.json({ message: "Data inserted successfully", data });
    });
});



//Periodicals

app.get("/api/periodicals_data", (req, res) => {
    const sql = "SELECT * FROM periodicals";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data: ', err);
            return res.status(500).json({ error: "Failed to fetch data" });
        }
        return res.json(data);
    });
});

app.post('/api/periodicals', (req, res) => {
    const sql = "INSERT INTO periodicals (`title`, `per_volume`,`amount`,`paid_on`,`expiry_date`,`periodicity`,`subscription`,`source`,`publisher`,`order_no`,`bill_no`,`from_date`,`to_date`,`volume`,`number`,`remarks`) VALUES (?, ?,?,?,?, ?,?,?,?, ?,?,? , ?,?,?,?)";
    const values = [
       
        req.body.title,
        req.body.per_volume,
        req.body.amount,

        req.body.paid_on,
        req.body.expiry_date,
        req.body.periodicity,

        req.body.subscription,
        req.body.source,
        req.body.publisher,

        req.body.order_no,
        req.body.bill_no,
        req.body.from_date,

        req.body.to_date,
        req.body.volume,
        req.body.number,

        req.body.remarks

    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({ error: "Failed to insert data" });
        }
        return res.json({ message: "Data inserted successfully", data });
    });
});


app.put('/api/update_periodicals/:id', (req, res) => {
    const sql = "UPDATE periodicals SET `title`=?,`per_volume`=?,`amount`=?,`paid_on`=?,`paid_on`=?,`expiry_date`=?,`periodicity`=?,`subscription`=?,`source`=?,`publisher`=?,`order_no`=?,`bill_no`=?,`from_date`=?,`to_date`=?,`volume`=?,`number`=?,`remarks`=? WHERE id=? ";
    const values = [
       
        req.body.title,
        req.body.per_volume,
        req.body.amount,

        req.body.paid_on,
        req.body.expiry_date,
        req.body.periodicity,

        req.body.subscription,
        req.body.source,
        req.body.publisher,

        req.body.order_no,
        req.body.bill_no,
        req.body.from_date,

        req.body.to_date,
        req.body.volume,
        req.body.number,

        req.body.remarks

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



app.delete('/api/delete_periodicals/:id', (req, res) => {
    const sql = "DELETE FROM periodicals WHERE ID = ? ";
    const id=req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({ error: "Failed to insert data" });
        }
        return res.json({ message: "Data inserted successfully", data });
    });
});


//Book-Barcodes


app.get("/api/book_barcodes_data", (req, res) => {
    const sql = "SELECT * FROM book_barcodes";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching data: ', err);
            return res.status(500).json({ error: "Failed to fetch data" });
        }
        return res.json(data);
    });
});

app.post('/api/book_barcodes', (req, res) => {
    const sql = "INSERT INTO book_barcodes (`book_type`, `book_no_from`,`book_no_to`,`generated_at`) VALUES (?, ?,?,NOW())";
    const values = [
       
        req.body.book_type,
        req.body.book_no_from,
        req.body.book_no_to
        
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({ error: "Failed to insert data" });
        }
        return res.json({ message: "Data inserted successfully", data });
    });
});


app.put('/api/update_book_barcodes/:id', (req, res) => {
    const sql = "UPDATE book_barcodes SET `book_type`=?,`book_no_from`=?,`book_no_to`=? WHERE id=? ";
    const values = [
       
        req.body.book_type,
        req.body.book_no_from,
        req.body.book_no_to
        

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



app.delete('/api/delete_book_barcodes/:id', (req, res) => {
    const sql = "DELETE FROM book_barcodes WHERE ID = ? ";
    const id=req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({ error: "Failed to insert data" });
        }
        return res.json({ message: "Data inserted successfully", data });
    });
});


























