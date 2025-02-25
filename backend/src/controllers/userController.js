const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Get all users
const index = (req, res) => {
    User.selectUsers((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({
                message: "No users found"
            });
        }
        res.status(200).json(result);
    });
};



// Create a new user
const storeUser = (req, res) => {
    const { hotel_id,username, email, password, is_admin } = req.body; 

    User.insertUser(hotel_id,username, email, password, is_admin, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: "User created successfully",
            userId: result.insertId
        });
    });
};



// Show user by ID
const showUser = (req, res) => {
    const { id } = req.params;
    
    User.selectUserById(id, (err, result) => {
        if (err) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json(result[0]);
    });
};

// Update user details
const updateUser = (req, res) => {
    const { id } = req.params;
    const { username, email, password,is_admin,hotel_id } = req.body;
    
    User.updateUser(id, username, email, password,is_admin,hotel_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("User updated successfully");
    });
};

// Delete user
const destroyUser = (req, res) => {
    const { id } = req.params;
    
    User.deleteUser(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("User deleted successfully");
    });
};

// Admin login
const login = (req, res) => {
    const { email, password } = req.body;
    
    User.selectEmailById(email, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // **Tambahkan pemeriksaan apakah user adalah admin**
        if (user.is_admin !== "admin") {
            return res.status(403).json({ message: "Access denied: Admin only" });
        }

        const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, "ayoosekolah", {
            expiresIn: 86400, // expires in 24 hours
        });

        res.status(200).json({
            auth: true,
            user_id: user.id,
            token: token,
            username: user.username,
            is_admin: user.is_admin // Kirim info admin ke frontend
        });
    });
};

//user login 
const loginUser = (req, res) => {
    const { email, password } = req.body;
    
    User.selectEmailById(email, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // **Tambahkan pemeriksaan apakah user adalah admin**
        if (user.is_admin !== "user") {
            return res.status(403).json({ message: "Access denied: user only" });
        }

        const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, "ayoosekolah", {
            expiresIn: 86400, // expires in 24 hours
        });

        res.status(200).json({
            auth: true,
            user_id: user.id,
            token: token,
            username: user.username,
            is_admin: user.is_admin // Kirim info admin ke frontend
        });
    });
};


// Admin Hotel login
const loginHotel = (req, res) => {
    const { email, password } = req.body;
    
    User.selectEmailById(email, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // **Tambahkan pemeriksaan apakah user adalah adminhotel**
        if (user.is_admin !== "adminhotel") {
            return res.status(403).json({ message: "Access denied: Adminhotel only" });
        }

        const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, "ayoosekolah", {
            expiresIn: 86400, // expires in 24 hours
        });

        res.status(200).json({
            auth: true,
            user_id: user.id,
            token: token,
            hotel_id: user.hotel_id,
            username: user.username,
            is_admin: user.is_admin // Kirim info admin ke frontend
        });
    });
};


// User logout
const logout = (req, res) => {
    res.status(200).json({
        auth: false,
        token: null
    });
};

module.exports = {
    index,
    storeUser,
    showUser,
    updateUser,
    destroyUser,
    login,
    logout,
    loginUser,
    loginHotel
};
