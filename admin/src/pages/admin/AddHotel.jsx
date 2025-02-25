import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddHotel = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: fData,
            });

            if (!response.ok) {
                throw new Error('Gagal menyimpan data');
            }

            event.target.reset();
            setPhoto(null);
            Swal.fire({
                icon: "success",
                text: "Simpan Berhasil",
                timer: 1000,
            }).then(() => {
                navigate('/admin/hotel');
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container" style={{ marginLeft: '25%' }}>
            <div className="row">
                <div className="col-md-5">
                    <div className="card" style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <div className="card-header">
                            <h2 className='text-center'>Input Data Hotel</h2>
                        </div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="name">Hotel Name</label>
                                    <input type="text" name="name" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input type="text" name='city' className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" name='address' className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="distance">Distance</label>
                                    <input type="text" name="distance" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="photos">Photos</label>
                                    <input type="file" name="photos" className="form-control" onChange={handleFileChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea name="description" className="form-control" rows="3" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rating">Rating</label>
                                    <input type="number" name="rating" className="form-control" step="0.1" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cheapest_price">Cheapest Price</label>
                                    <input type="number" name="cheapest_price" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="featured">Featured</label>
                                    <select name='featured' className="form-control" required>
                                        <option value=''>Pilih Featured</option>
                                        <option value='0'>False</option>
                                        <option value='1'>True</option>
                                    </select>
                                </div>
                            </div>
                            <div className="card-footer" style={{ display: "flex", gap: '20px', width: '100%' }}>
                                <Link to="/admin/hotel" style={{ marginLeft: '18%' }} className="btn btn-primary float-start">Lihat Data</Link>
                                <button type="submit" className='btn btn-primary'>Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddHotel;