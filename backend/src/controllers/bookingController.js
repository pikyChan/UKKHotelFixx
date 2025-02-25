const Booking = require("../models/booking");

const index = (req, res) => {
    Booking.selectBookings((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }
        res.status(200).json(result);
    });
};

// Show user by ID
const showHotel = (req, res) => {
    const { hotel_id } = req.params;
    Booking.selectHotels(hotel_id, (err, result) => {
        if (err) {
            return res.status(400).json({ message: "Room number not found" });
        }
        res.status(200).json(result[0]);
    });
};

const storeBooking = (req, res) => {
    const { 
        user_id, 
        room_id, 
        hotel_id, 
        room_number, 
        check_in, 
        check_out, 
        total_price, 
        payment_method, 
        status 
    } = req.body;
    
    // Validate check_in and check_out are in the correct format (YYYY-MM-DD)
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
        return res.status(400).json({ error: "Invalid date format for check-in or check-out" });
    }

    // Call to insert the booking into the database
    Booking.insertBooking(
        user_id, 
        room_id, 
        hotel_id, 
        room_number, 
        check_in, 
        check_out, 
        total_price, 
        payment_method, 
        status, 
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                message: "Booking created successfully",
                bookingId: result.insertId
            });
        }
    );
};


const showBooking = (req, res) => {
    const { id } = req.params;
    Booking.selectBookingById(id, (err, result) => {
        if (err) {
            return res.status(400).json({ message: "Booking not found" });
        }
        res.status(200).json(result[0]);
    });
};

const updateBooking = (req, res) => {
    const { id } = req.params;
    const { user_id, room_id,hotel_id, room_number, check_in, check_out, total_price, payment_method, status } = req.body;
    
    Booking.updateBooking(id, user_id, room_id,hotel_id, room_number, check_in, check_out, total_price, payment_method, status, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Booking updated successfully");
    });
};

const destroyBooking = (req, res) => {
    const { id } = req.params;
    Booking.deleteBooking(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Booking deleted successfully");
    });
};

module.exports = {
    index,
    storeBooking,
    showBooking,
    updateBooking,
    destroyBooking,
    showHotel
};
