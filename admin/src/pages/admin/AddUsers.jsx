import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddUsers = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  // State untuk menyimpan data hotel
  const [hotels, setHotels] = useState([]);

  // Mengambil data hotel saat pertama kali komponen di-mount
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

  // Fungsi untuk menangani submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fData = {};
    const frmel = event.target;
    for (let el of frmel.elements) {
      fData[el.name] = el.value;
    }

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
      console.log((error) => console.error);
    } else {
      event.target.reset();
      Swal.fire({
        icon: "success",
        text: "Simpan Berhasil",
        timer: 1000,
      }).then((res) => {
        navigate('/admin/users');
      });
    }
  };

  return (
    <div>
      <div className="container" style={{ marginLeft: '25%' }}>
        <div className="row">
          <div className="col-md-5">
            <div className="card" style={{ marginTop: '20px', marginBottom: '20px' }}>
              <div className="card-header">
                <h2 className="text-center">Input Data User</h2>
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
                    <label htmlFor="is_admin">Role</label>
                    <select id="is_admin" name="is_admin" className="form-control">
                      <option>Pilih Role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="adminhotel">Admin Hotel</option>
                    </select>
                  </div>
                  {/* Dropdown untuk memilih hotel */}
                  <div className="form-group">
                    <label htmlFor="hotel_id">Hotel</label>
                    <select id="hotel_id" name="hotel_id" className="form-control">
                      <option value="">Pilih Hotel</option>
                      {hotels.map((hotel) => (
                        <option key={hotel.id} value={hotel.id}>
                          {hotel.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="card-footer" style={{ display: "flex", gap: '20px', width: '100%' }}>
                  <Link to="/admin/users" style={{ marginLeft: '18%' }} className="btn btn-primary float-start">
                    Lihat Data
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
