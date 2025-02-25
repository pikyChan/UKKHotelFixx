const Hotel = require("../models/hotel");

const index = (req, res) => {
    Hotel.selectHotels((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "No hotels found" });
        }
        res.status(200).json(result);
    });
};

const indexFeatur = (req, res) => {
    Hotel.selectHotelsFeatur((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        console.log(result); // Log the result for debugging purposes
        if (result.length === 0) {
            return res.status(404).json({ message: "No hotels found" });
        }
        res.status(200).json(result);
    });
};


const storeHotel = (req, res) => {
    const {  name, city, address, distance, description, rating, cheapest_price, featured } = req.body;
    const photos = req.file ? req.file.filename : null;
  
    if (!photos) {
      return res.status(400).json({ error: "File upload failed, photo is null" });
    }
  
    Hotel.insertHotel(  name, city, address, distance, photos, description, rating, cheapest_price, featured, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      res.status(201).json({
        message: "Berhasil disimpan",
        PhotoId: result.insertId,
      });
    });
  };


const showHotel = (req, res) => {
    const { id } = req.params;
    Hotel.selectHotelById(id, (err, result) => {
        if (err) {
            return res.status(400).json({ message: "Hotel not found" });
        }
        res.status(200).json(result[0]);
    });
};

const updateHotel = (req, res) => {
    const { id } = req.params;
    const { name, city, address, distance,  description, rating, cheapest_price, featured } = req.body;
    
    Hotel.updateHotel(id, name, city, address, distance, description, rating, cheapest_price, featured, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Hotel data successfully updated");
    });
};

const destroyHotel = (req, res) => {
    const { id } = req.params;
    Hotel.deleteHotel(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Hotel deleted successfully");
    });
};

module.exports = {
    index,
    storeHotel,
    showHotel,
    updateHotel,
    destroyHotel,
    indexFeatur
};
