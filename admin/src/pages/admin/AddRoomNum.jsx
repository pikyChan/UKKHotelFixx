import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddRoomNum = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    
    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedHotelId, setSelectedHotelId] = useState(""); // Untuk menyimpan hotel yang dipilih

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

    // Ambil daftar rooms berdasarkan hotel yang dipilih
    useEffect(() => {
        if (selectedHotelId) {
            const fetchRooms = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:3000/api/rooms/hotel/${selectedHotelId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const data = await response.json();
                    setRooms(data);
                } catch (error) {
                    console.error("Error fetching rooms:", error);
                }
            };
            fetchRooms();
        } else {
            setRooms([]); // Jika tidak ada hotel yang dipilih, kosongkan daftar rooms
        }
    }, [selectedHotelId, token]);

    const handleHotelChange = (event) => {
        setSelectedHotelId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }
        try {
            const response = await fetch("http://127.0.0.1:3000/api/roomnumbers", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(fData),
            });

            if (!response.ok) {
                console.error("Error submitting data");
            } else {
                event.target.reset();
                Swal.fire({
                    icon: "success",
                    text: "Simpan Berhasil",
                    timer: 1000,
                }).then(() => {
                    navigate('/admin/roomnumber');
                });
            }
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };

    return (
        <div className="container" style={{ marginLeft: '25%' }}>
            <div className="row">
                <div className="col-md-5">
                    <div className="card" style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <div className="card-header">
                            <h2 className='text-center'>Input Data Room Number</h2>
                        </div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="hotel_id">Nama Hotel</label>
                                    <select name="hotel_id" className="form-control" required onChange={handleHotelChange}>
                                        <option value="">Pilih Hotel</option>
                                        {hotels.map(hotel => (
                                            <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="room_id">Nama Type Kamar</label>
                                    <select name="room_id" className="form-control" required>
                                        <option value="">Pilih Type Kamar</option>
                                        {rooms.map(room => (
                                            <option key={room.id} value={room.id}>{room.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="room_number">Nomor Kamar</label>
                                    <input type="text" name='room_number' className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select name='status' className="form-control" required>
                                        <option value=''>Pilih Status</option>
                                        <option value='available'>Available</option>
                                        <option value='booked'>Booked</option>
                                        <option value='maintenance'>Maintenance</option>
                                    </select>
                                </div>
                            </div>
                            <div className="card-footer" style={{ display: "flex", gap: '20px', width: '100%' }}>
                                <Link to="/admin/roomnumber" style={{ marginLeft: '18%' }} className="btn btn-primary float-start">Lihat Data</Link>
                                <button type="submit" className='btn btn-primary'>Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRoomNum;
