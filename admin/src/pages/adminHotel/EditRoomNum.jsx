import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditRoomNumHotel = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [hotel_id, setHotelId] = useState('');
    const [room_id, setRoomId] = useState('');
    const [room_number, setRoomNum] = useState('');
    const [status, setStatus] = useState('');
    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const token = localStorage.getItem('token');

    // Fetch daftar hotel
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch("http://127.0.0.1:3000/api/hotels", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };
        fetchHotels();
    }, [token]);

    // Fetch daftar rooms berdasarkan hotel_id yang dipilih
    useEffect(() => {
        if (!hotel_id) return; // Hindari fetch jika hotel belum dipilih

        const fetchRooms = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/api/rooms/hotel/${hotel_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };
        fetchRooms();
    }, [hotel_id, token]);

    // Fetch data kamar berdasarkan id yang diedit
    useEffect(() => {
        const getRoomNum = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/api/roomnumbers/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setHotelId(data.hotel_id);
                setRoomId(data.room_id);
                setRoomNum(data.room_number);
                setStatus(data.status);
            } catch (error) {
                console.error("Error fetching room number details:", error);
            }
        };
        getRoomNum();
    }, [id, token]);

    // Handle perubahan input
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'hotel_id') {
            setHotelId(value);
            setRoomId(''); // Reset pilihan room_id saat hotel berubah
        }
        if (name === 'room_id') setRoomId(value);
        if (name === 'room_number') setRoomNum(value);
        if (name === 'status') setStatus(value);
    };

    // Handle submit form
    const handleUpdate = async (event) => {
        event.preventDefault();
        const formData = { hotel_id, room_id, room_number, status };
    
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/roomnumbers/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
    
            console.log(response); // Tambahkan ini untuk melihat response dari API
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Gagal memperbarui data: ${errorText}`);
            }
    
            Swal.fire({
                icon: "success",
                text: "Update Berhasil",
                timer: 1000,
            }).then(() => {
                navigate('/adminhotel/roomnumberhotel');
            });
        } catch (error) {
            console.error("Error updating room number:", error);
        }
    };
    

    return (
        <div className="container" style={{ marginLeft: '25%' }}>
            <div className="row">
                <div className="col-md-5">
                    <div className="card" style={{ marginTop: '10px' }}>
                        <div className="card-header">
                            <h2 className='text-center'>Edit Data Room Numbers</h2>
                        </div>
                        <form onSubmit={handleUpdate}>
                            <div className="card-body">
                                
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

export default EditRoomNumHotel;
