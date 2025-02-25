const koneksi = require("./db");
const bcrypt = require("bcryptjs");

const selectUsers = (callback) => {
    const q = "SELECT * FROM users";
    koneksi.query(q, callback);
};



const insertUser = (hotel_id,username, email, password, is_admin = 'user', callback) => {
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const q = "INSERT INTO users(hotel_id,username, email, password, is_admin) VALUES(?,?, ?, ?, ?)";
        koneksi.query(q, [hotel_id,username, email, hashedPassword, is_admin], callback);
    } else {
        console.error("Password is required");
    }
};

const selectUserById = (id, callback) => {
    const q = "SELECT * FROM users WHERE id = ?";
    koneksi.query(q, [id], callback);
};

const selectEmailById = (email, callback) => {
    const q = "SELECT * FROM users WHERE email = ?";
    koneksi.query(q, [email], callback);
};

const updateUser = (id, username, email, password, is_admin,hotel_id, callback) => {
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const q = "UPDATE users SET username = ?, email = ?, password = ?, is_admin = ?,hotel_id=? WHERE id = ?";
        koneksi.query(q, [hotel_id,username, email, hashedPassword, is_admin, id], callback);
    } else {
        const q = "UPDATE users SET username = ?,email = ?, is_admin = ?,hotel_id=? WHERE id = ?";
        koneksi.query(q, [username, email, is_admin,hotel_id, id], callback);
    }
};

const deleteUser = (id, callback) => {
    const q = "DELETE FROM users WHERE id = ?";
    koneksi.query(q, [id], callback);
};

module.exports = {
    selectUsers,
    insertUser,
    selectUserById,
    updateUser,
    deleteUser,
    selectEmailById
   
};
