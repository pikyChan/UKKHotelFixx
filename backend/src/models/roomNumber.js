const koneksi = require("./db");

const selectRoomNumbers = (callback) => {
    const q = "SELECT * FROM room_numbers";
    koneksi.query(q, callback);
};

const insertRoomNumber = (hotel_id,room_id, room_number,status, callback) => {
    const q = "INSERT INTO room_numbers(hotel_id,room_id, room_number,status) VALUES(?, ?, ?, ?)";
    koneksi.query(q, [hotel_id,room_id, room_number,status], callback);
};

const selectRoomNumberById = (id, callback) => {
    const q = "SELECT * FROM room_numbers WHERE id = ?";
    koneksi.query(q, [id], callback);
};

const selectRoomNumberTypeById = (room_id, callback) => {
    const q = "SELECT * FROM room_numbers WHERE room_id = ?";
    koneksi.query(q, [room_id], callback);
};

const selectRoomNumberHotelById = (hotel_id, callback) => {
    const q = "SELECT * FROM room_numbers WHERE hotel_id = ?";
    koneksi.query(q, [hotel_id], callback);
};



const updateRoomNumber = (id,hotel_id,room_id, room_number,status, callback) => {
    if (hotel_id) {
        const q = "UPDATE room_numbers SET hotel_id=?,room_id = ?, room_number = ?, status = ?  WHERE id = ?";
        koneksi.query(q, [hotel_id,room_id, room_number,status, id], callback);
    } else {
        const q = "UPDATE room_numbers SET room_id = ?, room_number = ?, status = ? WHERE id = ?";
        koneksi.query(q, [ room_id, room_number, status, id], callback);
    }
};

const updateStatusRoomNumber = (id,status, callback) => {
    const q = "UPDATE room_numbers SET  status = ?  WHERE id = ?";
    koneksi.query(q, [status, id], callback);
};

const deleteRoomNumber = (id, callback) => {
    const q = "DELETE FROM room_numbers WHERE id = ?";
    koneksi.query(q, [id], callback);
};

module.exports = {
    selectRoomNumbers,
    insertRoomNumber,
    selectRoomNumberById,
    updateRoomNumber,
    deleteRoomNumber,
    selectRoomNumberTypeById,
    updateStatusRoomNumber,
    selectRoomNumberHotelById
};
