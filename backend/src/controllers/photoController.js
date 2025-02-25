const Photo = require("../models/photo");

const index = (req, res) => {
  Photo.selectPhoto((err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Foto kosong" });
    }
    res.status(200).json(result);
  });
};

const storePhoto = (req, res) => {
  const { judul, keterangan, user_id } = req.body;
  const file_path = req.file ? req.file.filename : null;

  if (!file_path) {
    return res.status(400).json({ error: "File upload failed, file_path is null" });
  }

  Photo.insertPhoto( judul, keterangan, file_path, user_id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      message: "Berhasil disimpan",
      PhotoId: result.insertId,
    });
  });
};

const showPhoto = (req, res) => {
  const { id } = req.params;
  Photo.selectPhotoById(id, (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Foto tidak ditemukan" });
    }
    res.status(200).json(result[0]);
  });
};

const showPhotoUser = (req, res) => {
  const { user_id } = req.params;
  Photo.selectPhotoUserById(user_id, (err, result) => {
    if (err) {
      return res.status(400).json({ message: "Foto tidak ditemukan" });
    }
    // Return all records for the user_id, not just the first one
    res.status(200).json(result); // Send the entire result array
  });
};


const destroyPhoto = (req, res) => {
  const { id } = req.params;
  Photo.deletePhoto(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Data berhasil dihapus" });
  });
};

module.exports = { index, storePhoto, showPhoto, destroyPhoto, showPhotoUser };
