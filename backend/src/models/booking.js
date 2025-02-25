const koneksi = require("./db");

const selectBookings = (callback) => {
    const q = "SELECT * FROM bookings";
    koneksi.query(q, callback);
};

const selectHotels = (hotel_id, callback) => {
    const q = "SELECT * FROM bookings WHERE hotel_id = ?";
    koneksi.query(q, [hotel_id], callback);
};

const insertBooking = (user_id, room_id,hotel_id, room_number, check_in, check_out, total_price, payment_method, status, callback) => {
    const q = "INSERT INTO bookings(user_id, room_id,hotel_id, room_number, check_in, check_out, total_price, payment_method, status) VALUES(?,?, ?, ?, ?, ?, ?, ?, ?)";
    koneksi.query(q, [user_id, room_id,hotel_id, room_number, check_in, check_out, total_price, payment_method, status], callback);
};

const selectBookingById = (id, callback) => {
    const q = "SELECT * FROM bookings WHERE id = ?";
    koneksi.query(q, [id], callback);
};

const updateBooking = (id, user_id, room_id,hotel_id, room_number, check_in, check_out, total_price, payment_method, status, callback) => {
    if (hotel_id) {
        const q = "UPDATE bookings SET user_id = ?, room_id = ?,hotel_id=?, room_number = ?, check_in = ?, check_out = ?, total_price = ?, payment_method = ?, status = ?  WHERE id = ?";
        koneksi.query(q, [ user_id, room_id,hotel_id, room_number, check_in, check_out, total_price, payment_method, status, id], callback);
    } else {
        const q = "UPDATE bookings SET user_id = ?, room_id = ?, room_number = ?, check_in = ?, check_out = ?, total_price = ?, payment_method = ?, status = ? WHERE id = ?";
        koneksi.query(q, [ user_id, room_id, room_number, check_in, check_out, total_price, payment_method, status, id], callback);
    }
};

const deleteBooking = (id, callback) => {
    const q = "DELETE FROM bookings WHERE id = ?";
    koneksi.query(q, [id], callback);
};

module.exports = {
    selectBookings,
    insertBooking,
    selectBookingById,
    updateBooking,
    deleteBooking,
    selectHotels
};
