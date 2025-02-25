const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const hotelController = require("../controllers/hotelController");
const bookingController = require("../controllers/bookingController");
const roomNumberController = require("../controllers/roomNumberController");
const roomController = require("../controllers/roomController")
const authJWt = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// Setup Multer storage for photo uploads
const imageUploadPath = path.join(__dirname, "../Uploads"); // Adjusted path
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const timestamp = Date.now();
    cb(null, `${timestamp}${ext}`);
  },
});

const imageUpload = multer({ storage });

// Middleware to serve static files from the 'Uploads' folder
router.use("/uploads", express.static(imageUploadPath));

// User Routes
router.get("/users",  userController.index);
router.post("/users",  userController.storeUser);
router.get("/users/:id", authJWt, userController.showUser);
router.put("/users/:id", authJWt, userController.updateUser);
router.delete("/users/:id", authJWt, userController.destroyUser);
router.post("/login", userController.login);
router.post("/loginhotel", userController.loginHotel);
router.post("/loginuser", userController.loginUser);
router.post("/logout", authJWt, userController.logout);

// Routes for hotels
router.get("/hotels", hotelController.index);
router.get("/hotels/featured", hotelController.indexFeatur);
router.post("/hotels", imageUpload.single("photos"),hotelController.storeHotel);
router.get("/hotels/:id", hotelController.showHotel);
router.put("/hotels/:id", hotelController.updateHotel);
router.delete("/hotels/:id", hotelController.destroyHotel);

router.get("/rooms", roomController.index);
router.get("/rooms/:id", roomController.showIdRoom);
router.get("/rooms/hotel/:hotel_id", roomController.showRoom);
router.post("/rooms", roomController.storeRoom);
router.put("/rooms/:id", roomController.updateRoom);
router.delete("/rooms/:id", roomController.destroyRoom);

// Routes for room numbers
router.get("/roomnumbers", roomNumberController.index);
router.get("/roomnumbers/type/:room_id", roomNumberController.showRoomTypeNumber);
router.post("/roomnumbers", roomNumberController.storeRoomNumber);
router.get("/roomnumbers/:id", roomNumberController.showRoomNumber);
router.get("/roomnumbers/hotel/:hotel_id", roomNumberController.showRoomHotelNumber);
router.put("/roomnumbers/:id", roomNumberController.updateRoomNumber);
router.put("/roomnumbers/status/:id", roomNumberController.updateStatusRoomNumber);
router.delete("/roomnumbers/:id", roomNumberController.destroyRoomNumber);


// Routes for bookings
router.get("/bookings", bookingController.index);
router.post("/bookings", bookingController.storeBooking);
router.get("/bookings/hotel/:hotel_id", bookingController.showHotel);
router.get("/bookings/:id", bookingController.showBooking);
router.put("/bookings/:id", bookingController.updateBooking);
router.delete("/bookings/:id", bookingController.destroyBooking);


module.exports = router;
