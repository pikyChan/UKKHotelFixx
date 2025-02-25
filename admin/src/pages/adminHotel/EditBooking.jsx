import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditBookingHotel = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user_id, setUserId] = useState('');
    const [hotel_id, setHotelId] = useState('');  // Initialize hotel_id state
    const [room_id, setRoomId] = useState('');
    const [room_number, setRoomNumber] = useState('');
    const [check_in, setCheckIn] = useState('');
    const [check_out, setCheckOut] = useState('');
    const [total_price, setTotalPrice] = useState('');
    const [payment_method, setPaymentMethod] = useState('');
    const [status, setStatus] = useState('');
    const token = localStorage.getItem('token');
    const [rooms, setRooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [roomNums, setRoomNums] = useState([]);

    useEffect(() => {
        // Fetch hotel_id from localStorage
        const storedHotelId = localStorage.getItem('hotelId');
        setHotelId(storedHotelId);  // Set the hotel_id state from localStorage
        
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://127.0.0.1:3000/api/users", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [token]);

    // Fetch rooms based on the hotel_id stored in localStorage
    useEffect(() => {
        if (!hotel_id) return; // Ensure hotel_id is available before fetching rooms

        const fetchRooms = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/api/rooms/hotel/${hotel_id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };
        fetchRooms();
    }, [hotel_id, token]);

    useEffect(() => {
        const fetchRoomNums = async () => {
            try {
                const response = await fetch("http://127.0.0.1:3000/api/roomnumbers", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                setRoomNums(data);
            } catch (error) {
                console.error("Error fetching room numbers:", error);
            }
        };
        fetchRoomNums();
    }, [token]);

    useEffect(() => {
        getUser();
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        if (name === 'user_id') setUserId(event.target.value);
        if (name === 'room_id') setRoomId(event.target.value);
        if (name === 'room_number') setRoomNumber(event.target.value);
        if (name === 'check_in') setCheckIn(event.target.value);
        if (name === 'check_out') setCheckOut(event.target.value);
        if (name === 'total_price') setTotalPrice(event.target.value);
        if (name === 'payment_method') setPaymentMethod(event.target.value);
        if (name === 'status') setStatus(event.target.value);
    };

    const getUser = async () => {
        const response = await fetch(`http://127.0.0.1:3000/api/bookings/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUserId(data.user_id);
        setRoomId(data.room_id);
        setRoomNumber(data.room_number);
        setCheckIn(data.check_in);
        setCheckOut(data.check_out);
        setTotalPrice(data.total_price);
        setPaymentMethod(data.payment_method);
        setStatus(data.status);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }
        const response = await fetch(`http://127.0.0.1:3000/api/bookings/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fData),
        });

        if (!response.ok) {
            console.log(error => console.error);
        } else {
            event.target.reset();
            Swal.fire({
                icon: "success",
                text: "Update Berhasil",
                timer: 1000,
            }).then((res) => {
                navigate('/adminhotel/bookinghotel');
            });
        }
    };

    return (
        <div>
            <div className="container" style={{ marginLeft: '25%' }}>
                <div className="row">
                    <div className="col-md-5">
                        <div className="card" style={{ marginTop: '10px' }}>
                            <div className="card-header">
                                <h2 className='text-center'>Edit Data Booking</h2>
                            </div>
                            <form onSubmit={handleUpdate}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="user_id">Nama User</label>
                                        <select name="user_id" className="form-control" value={user_id} onChange={handleChange} required>
                                            <option value="">Pilih Nama User</option>
                                            {users.map(user => (
                                                <option key={user.id} value={user.id}>{user.username}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="room_id">Tipe Kamar</label>
                                        <select name="room_id" className="form-control" value={room_id} onChange={handleChange} required>
                                            <option value="">Pilih Tipe Kamar</option>
                                            {rooms.map(room => (
                                                <option key={room.id} value={room.id}>{room.title}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="room_number">Nomor Kamar</label>
                                        <select name="room_number" className="form-control" value={room_number} onChange={handleChange} required>
                                            <option value="">Pilih Nomor Kamar</option>
                                            {roomNums.map(roomNum => (
                                                <option key={roomNum.id} value={roomNum.id}>{roomNum.room_number}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="check_in">Check In</label>
                                        <input type="date" name="check_in" className="form-control" value={check_in} onChange={handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="check_out">Check Out</label>
                                        <input type="date" name="check_out" className="form-control" step="0.1" value={check_out} onChange={handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="total_price">Total Price</label>
                                        <input type="text" name="total_price" className="form-control" value={total_price} onChange={handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="payment_method">Payment Method</label>
                                        <select name='payment_method' className="form-control" value={payment_method} onChange={handleChange}>
                                            <option value=''>Pilih Payment Method</option>
                                            <option value='credit card'>Credit Card</option>
                                            <option value='cash'>Cash</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="status">Status</label>
                                        <select name='status' className="form-control" value={status} onChange={handleChange}>
                                            <option value=''>Pilih Status</option>
                                            <option value='pending'>Pending</option>
                                            <option value='confirmed'>Confirmed</option>
                                            <option value='cancelled'>Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="card-footer" style={{ display: "flex", gap: '20px', width: '100%' }}>
                                    <Link to="/adminhotel/bookinghotel" style={{ marginLeft: '18%' }} className="btn btn-primary float-start">Lihat Data</Link>
                                    <button type="submit" className='btn btn-primary'>Simpan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBookingHotel;
