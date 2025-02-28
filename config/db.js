// const mysql = require("mysql2");
// require("dotenv").config();


// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "librarydb",
//     port:3307,
//     waitForConnections: true,
//     connectionLimit: 10,      // Limit the number of connections
//     queueLimit: 0
// });

// // Connect to MySQL
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed: ' + err.stack);
//         return;
//     }
//     console.log('Connected to MySQL as ID ' + db.threadId);
// });

// app.listen(port, () => {
//     console.log("Server running on port 8080");
// });