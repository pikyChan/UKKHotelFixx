const koneksi = require("./db");

const selectHotels = (callback) => {
    const q = "SELECT * FROM hotels";
    koneksi.query(q, callback);
};
const selectHotelsFeatur = (callback) => {
    const q = `SELECT * FROM hotels WHERE featured = 1`;
    koneksi.query(q, callback);
};



const insertHotel = (name, city, address, distance, photos, description, rating, cheapest_price, featured, callback) => {
    const q = "INSERT INTO hotels(name, city, address, distance, photos, description, rating, cheapest_price, featured) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
    koneksi.query(q, [name, city, address, distance, photos, description, rating, cheapest_price, featured], callback);
};

const selectHotelById = (id, callback) => {
    const q = "SELECT * FROM hotels WHERE id = ?";
    koneksi.query(q, [id], callback);
};

const updateHotel = (id, name, city, address, distance,description, rating, cheapest_price, featured, callback) => {
    const q = "UPDATE hotels SET name = ?, city = ?, address = ?, distance = ?, description = ?, rating = ?, cheapest_price = ?, featured = ? WHERE id = ?";
    koneksi.query(q, [name, city, address, distance,  description, rating, cheapest_price, featured, id], callback);
};

const deleteHotel = (id, callback) => {
    const q = "DELETE FROM hotels WHERE id = ?";
    koneksi.query(q, [id], callback);
};

module.exports = {
    selectHotels,
    insertHotel,
    selectHotelById,
    updateHotel,
    deleteHotel,
    selectHotelsFeatur
};
