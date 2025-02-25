import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterHotel = () => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);

    const handleFileChange = (event) => {
        setPhoto(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = new FormData();
        const frmel = event.target;
        
        for (let el of frmel.elements) {
            if (el.name && el.type !== 'file') {
                fData.append(el.name, el.value);
            }
        }

        if (photo) {
            fData.append('photos', photo);
        }

        try {
            const response = await fetch("http://127.0.0.1:3000/api/hotels", {
                method: "POST",
                mode: "cors",
                body: fData,
            });

            if (!response.ok) {
                throw new Error('Gagal mendaftarkan hotel');
            }

            event.target.reset();
            setPhoto(null);
            Swal.fire({
                icon: "success",
                text: "Pendaftaran Berhasil! Silakan daftarkan user hotel untuk melanjutkan.",
                timer: 2000,
            }).then(() => {
                navigate('/signup');
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-box" style={{width:"420px"}}>
      <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <h2>Pendaftaran Hotel</h2>
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="card-body">
                        <div className="form-group">
                            <label>Nama Hotel</label>
                            <input type="text" name="name" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Kota</label>
                            <input type="text" name="city" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Alamat</label>
                            <input type="text" name="address" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Deskripsi</label>
                            <textarea name="description" className="form-control" rows="3" required></textarea>
                        </div>
                        <div className="form-group">
                            <label>Foto Hotel</label>
                            <input type="file" name="photos" className="form-control" onChange={handleFileChange} required />
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <button type="submit" className="btn btn-primary">Daftar Hotel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterHotel;