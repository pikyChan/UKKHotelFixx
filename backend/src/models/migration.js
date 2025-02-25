const mysql = require("mysql2");
const konekMysql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
});

const createUsersTable = (koneksi) => {
    const q = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        is_admin ENUM('admin', 'user','adminhotel') DEFAULT 'user',
        hotel_id INT, 
        FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
    )`;
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("Error creating users table:", err.stack);
            return;
        }
        console.log("Users table created successfully.");
    });
};

const createHotelsTable = (koneksi) => {
    const q = `CREATE TABLE IF NOT EXISTS hotels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        city VARCHAR(100),
        address TEXT,
        distance VARCHAR(255),
        photos VARCHAR(255),
        description TEXT, 
        rating FLOAT,    
        cheapest_price DECIMAL(10, 2),
        featured BOOLEAN DEFAULT TRUE
    )`;
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("Error creating hotels table:", err.stack);
            return;
        }
        console.log("Hotels table created successfully.");
    });
};

const createRoomsTable = (koneksi) => {
    const q = `CREATE TABLE IF NOT EXISTS rooms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        hotel_id INT,
        title VARCHAR(255),
        price DECIMAL(10, 2),
        max_people INT,
        description TEXT,
        FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
    )`;
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("Error creating rooms table:", err.stack);
            return;
        }
        console.log("Rooms table created successfully.");
    });
};

const createRoomNumbersTable = (koneksi) => {
    const q = `CREATE TABLE IF NOT EXISTS room_numbers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        hotel_id INT,
        room_id INT,
        room_number INT,
        status ENUM('available', 'booked', 'maintenance') DEFAULT 'available',
        FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
         FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
        
    )`;
    
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("Error creating room_numbers table:", err.stack);
            return;
        }
        console.log("Room_numbers table created successfully.");
    });
};


const createBookingsTable = (koneksi) => {
    const q = `CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        room_id INT,
        hotel_id INT,
        room_number INT,
        check_in DATETIME,
        check_out DATETIME,
        total_price DECIMAL(10, 2),
        payment_method ENUM('Credit Card', 'Cash'),
        status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
        FOREIGN KEY (room_number) REFERENCES room_numbers(id) ON DELETE CASCADE,
        FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
    )`;
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("Error creating bookings table:", err.stack);
            return;
        }
        console.log("Bookings table created successfully.");
    });
};



const migration = () => {
    konekMysql.connect((err) => {
        if (err) {
            console.error("Error connecting to database", err.stack);
            return;
        }
        console.log("Connected to MySQL successfully.");

        konekMysql.query("CREATE DATABASE IF NOT EXISTS hotel_booking", (err, result) => {
            if (err) {
                console.error("Error creating database:", err.stack);
                return;
            }
            console.log("Database created or already exists.");

            konekMysql.query("USE hotel_booking", (err) => {
                if (err) {
                    console.error("Error selecting database:", err.stack);
                    return;
                }

                // Create all tables in the correct order
                createUsersTable(konekMysql);
                createHotelsTable(konekMysql);
                createRoomsTable(konekMysql);
                createRoomNumbersTable(konekMysql);
                createBookingsTable(konekMysql);
              

                konekMysql.end();
            });
        });
    });
};

module.exports = migration;
