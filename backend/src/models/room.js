const koneksi = require("./db");

const selectRooms = (callback) => {
    const q = "SELECT * FROM rooms";
    koneksi.query(q, callback);
};

const insertRoom = (hotel_id, title, price, max_people,description, callback) => {
    const q = "INSERT INTO rooms(hotel_id, title, price, max_people, description) VALUES(?, ?, ?, ?, ?)";
    koneksi.query(q, [hotel_id, title, price, max_people, description], callback);
};

const selectRoomByIdR = (id, callback) => {
    const q = "SELECT * FROM rooms WHERE id = ?";
    koneksi.query(q, [id], callback);
};

const selectRoomById = (hotel_id, callback) => {
    const q = "SELECT * FROM rooms WHERE hotel_id = ?";
    koneksi.query(q, [hotel_id], callback);
};

const updateRoom = (id, hotel_id, title, price, max_people, description, callback) => {
    if (hotel_id) {
        const q = "UPDATE rooms SET hotel_id = ?, title = ?, price = ?, max_people = ?,description = ?  WHERE id = ?";
        koneksi.query(q, [hotel_id, title, price, max_people, description, id], callback);
    } else {
        const q = "UPDATE rooms SET title = ?, price = ?, max_people = ?,description = ? WHERE id = ?";
        koneksi.query(q, [ title, price, max_people, description, id], callback);
    }
};

const deleteRoom = (id, callback) => {
    const q = "DELETE FROM rooms WHERE id = ?";
    koneksi.query(q, [id], callback);
};

module.exports = {
    selectRooms,
    insertRoom,
    selectRoomById,
    updateRoom,
    deleteRoom,
    selectRoomByIdR
};
