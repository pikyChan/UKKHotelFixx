const koneksi = require("./db");

const selectPhoto = (callback) => {
    const q = "SELECT * FROM photos";
    koneksi.query(q, callback);
};

const insertPhoto = ( judul, keterangan, file_path, user_id, callback) => {
    const q = "INSERT INTO photos( judul, keterangan, file_path, user_id) VALUES(?, ?, ?, ?)";
    koneksi.query(q, [ judul, keterangan, file_path, user_id], callback);
};

const selectPhotoUserById = (user_id, callback) => {
    const q = "SELECT * FROM photos where user_id =?";
    koneksi.query(q, [user_id], callback);
};

const selectPhotoById = (id, callback) => {
    const q = "SELECT * FROM photos where id =?";
    koneksi.query(q, [id], callback);
};

const deletePhoto = (id, callback) => {
    const q ="DELETE FROM photos where id=?";
    koneksi.query(q, [id], callback);
};

module.exports= {selectPhoto, insertPhoto, selectPhotoById, deletePhoto,selectPhotoUserById}