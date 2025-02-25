import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddRoomNumHotel = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [rooms, setRooms] = useState([]);
    const [selectedHotelId] = useState("1");  // Hardcoded or set programmatically for the hotel ID
    const [room_id, setRoomId] = useState('');
    const [room_number, setRoomNum] = useState('');
    const [status, setStatus] = useState('');

    // Fetch rooms based on the hotel_id (set from context or hardcoded)
    useEffect(() => {
        if (!selectedHotelId) return; // Ensure that the hotel_id is set before fetching rooms
        
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
    }, [selectedHotelId, token]);

    // Handle perubahan input
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'room_id') setRoomId(value);
        if (name === 'room_number') setRoomNum(value);
        if (name === 'status') setStatus(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = { hotel_id: selectedHotelId, room_id, room_number, status };

        try {
            const response = await fetch("http://127.0.0.1:3000/api/roomnumbers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
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
                    navigate('/adminhotel/roomnumberhotel');
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
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                {/* Removed hotel_id selection */}
                                <input type="hidden" name="hotel_id" value={selectedHotelId} /> {/* Hidden hotel_id field */}
                                
                                <div className="form-group">
                                    <label htmlFor="room_id">Nama Type Kamar</label>
                                    <select name="room_id" className="form-control" value={room_id} onChange={handleChange} required>
                                        <option value="">Pilih Type Kamar</option>
                                        {rooms.map(room => (
                                            <option key={room.id} value={room.id}>{room.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="room_number">Nomor Kamar</label>
                                    <input type="text" name='room_number' className="form-control" value={room_number} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select name='status' className="form-control" value={status} onChange={handleChange} required>
                                        <option value=''>Pilih Status</option>
                                        <option value='available'>Available</option>
                                        <option value='booked'>Booked</option>
                                        <option value='maintenance'>Maintenance</option>
                                    </select>
                                </div>
                            </div>
                            <div className="card-footer" style={{ display: "flex", gap: '20px', width: '100%' }}>
                                <Link to="/adminhotel/roomnumberhotel" style={{ marginLeft: '18%' }} className="btn btn-primary float-start">Lihat Data</Link>
                                <button type="submit" className='btn btn-primary'>Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRoomNumHotel;
