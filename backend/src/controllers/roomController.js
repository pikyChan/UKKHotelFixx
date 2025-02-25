const Room = require("../models/room");

const index = (req, res) => {
    Room.selectRooms((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "No rooms found" });
        }
        res.status(200).json(result);
    });
};

const storeRoom = (req, res) => {
    const { hotel_id, title, price, max_people, description } = req.body;
    
    Room.insertRoom(hotel_id, title, price, max_people, description, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: "Room created successfully",
            roomId: result.insertId
        });
    });
};

const showIdRoom = (req, res) => {
    const { id } = req.params;
    Room.selectRoomByIdR(id, (err, result) => {
        if (err) {
            return res.status(400).json({ message: "Room not found" });
        }
        res.status(200).json(result);
    });
};

const showRoom = (req, res) => {
    const { hotel_id } = req.params;
    Room.selectRoomById(hotel_id, (err, result) => {
        if (err) {
            return res.status(400).json({ message: "Room not found" });
        }
        res.status(200).json(result);
    });
};

const updateRoom = (req, res) => {
    const { id } = req.params;
    const { hotel_id, title, price, max_people,description } = req.body;
    
    Room.updateRoom(id, hotel_id, title, price, max_people, description, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Room updated successfully");
    });
};

const destroyRoom = (req, res) => {
    const { id } = req.params;
    Room.deleteRoom(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Room deleted successfully");
    });
};

module.exports = {
    index,
    storeRoom,
    showRoom,
    updateRoom,
    destroyRoom,
    showIdRoom
};
