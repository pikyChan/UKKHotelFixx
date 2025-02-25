const mysql = require("mysql2");
const koneksi = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"hotel_booking",
});
koneksi.connect((err) => {
    if (err) {
        console.error("Error koneksi ke database", err.stack);
        return;
    }
    console.log("Berhasil koneksi ke database hotel_booking");
    console.log("=============================================");
});
module.exports = koneksi;