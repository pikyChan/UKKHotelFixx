import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddUsers = () => {
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

        // Set 'is_admin' to 'adminhotel' automatically
        fData.is_admin = 'adminhotel';

        try {
            const response = await fetch("http://127.0.0.1:3000/api/users", {
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
                text: "Sign Up Berhasil!! Silahkan untuk Login.",
                timer: 1000,
            }).then(() => navigate('/loginhotel'));
        } catch (error) {
            console.error("Error saving user:", error);
            Swal.fire({
                icon: "error",
                text: "Gagal menyimpan data",
            });
        }
    };

    return (
        <div>
            <div className="login-box " style={{ width: "420px" }}>
                <div className="card card-outline card-primary">
                    <div className="card-header">
                        <h2 className="text-center">Masukkan Data User</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="hotel_id">Hotel</label>
                                <select name="hotel_id" className="form-control" required>
                                    <option value="">Pilih Hotel</option>
                                    {hotels.map(hotel => (
                                        <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="card-footer" style={{ display: "flex", gap: "20px", width: "100%" }}>
                            <button type="submit" className="btn btn-primary">Daftar User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUsers;
