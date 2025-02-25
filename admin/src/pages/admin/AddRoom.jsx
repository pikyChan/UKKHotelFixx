import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddRoom = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [hotels, setHotels] = useState([]);
    
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch("http://127.0.0.1:3000/api/hotels", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };
        fetchHotels();
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            if (el.name) {
                fData[el.name] = el.value;
            }
        }

        try {
            const response = await fetch("http://127.0.0.1:3000/api/rooms", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(fData),
            });

            if (!response.ok) {
                throw new Error("Gagal menyimpan data");
            }

            event.target.reset();
            Swal.fire({
                icon: "success",
                text: "Simpan Berhasil",
                timer: 1000,
            }).then(() => navigate('/admin/room'));
        } catch (error) {
            console.error("Error saving room:", error);
            Swal.fire({
                icon: "error",
                text: "Gagal menyimpan data",
            });
        }
    };

    return (
        <div className="container" style={{ marginLeft: '25%' }}>
            <div className="row">
                <div className="col-md-5">
                    <div className="card" style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <div className="card-header">
                            <h2 className='text-center'>Input Data Room</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="hotel_id">Nama Hotel</label>
                                    <select name="hotel_id" className="form-control" required>
                                        <option value="">Pilih Hotel</option>
                                        {hotels.map(hotel => (
                                            <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" name='title' className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input type="number" name="price" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="max_people">Max People</label>
                                    <input type="number" name="max_people" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea rows="3" name='description' className="form-control" required />
                                </div>
                            </div>
                            <div className="card-footer" style={{ display: "flex", gap: '20px', width: '100%' }}>
                                <Link to="/admin/room" style={{ marginLeft: '18%' }} className="btn btn-primary float-start">Lihat Data</Link>
                                <button type="submit" className='btn btn-primary'>Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRoom;
