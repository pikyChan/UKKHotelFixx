const RoomNumber = require("../models/roomNumber");

const index = (req, res) => {
    RoomNumber.selectRoomNumbers((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "No room numbers found" });
        }
        res.status(200).json(result);
    });
};

const storeRoomNumber = (req, res) => {
    const {hotel_id, room_id, room_number,status } = req.body;
    
    RoomNumber.insertRoomNumber(hotel_id,room_id, room_number,status, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: "Room number created successfully",
            roomNumberId: result.insertId
        });
    });
};

const showRoomNumber = (req, res) => {
    const { id } = req.params;
    RoomNumber.selectRoomNumberById(id, (err, result) => {
        if (err) {
            return res.status(400).json({ message: "Room number not found" });
        }
        res.status(200).json(result[0]);
    });
};

const showRoomTypeNumber = (req, res) => {
    const { room_id } = req.params;
    RoomNumber.selectRoomNumberTypeById(room_id, (err, result) => {
        if (err) {
            return res.status(400).json({ message: "Room number not found" });
        }
        res.status(200).json(result[0]);
    });
};

const showRoomHotelNumber = (req, res) => {
    const { hotel_id } = req.params;
    RoomNumber.selectRoomNumberHotelById(hotel_id, (err, result) => {
        if (err) {
            return res.status(400).json({ message: "Room number  hotel not found" });
        }
        res.status(200).json(result[0]);
    });
};

const updateRoomNumber = (req, res) => {
    const { id } = req.params;
    const {hotel_id, room_id, room_number,status } = req.body;
    
    RoomNumber.updateRoomNumber(id,hotel_id, room_id, room_number,status, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Room number updated successfully");
    });
};

const updateStatusRoomNumber = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    RoomNumber.updateStatusRoomNumber(id, status, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Room number status updated successfully");
    });
};

const destroyRoomNumber = (req, res) => {
    const { id } = req.params;
    RoomNumber.deleteRoomNumber(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Room number deleted successfully");
    });
};

module.exports = {
    index,
    storeRoomNumber,
    showRoomNumber,
    updateRoomNumber,
    destroyRoomNumber,
    showRoomTypeNumber,
    updateStatusRoomNumber,
    showRoomHotelNumber
};
