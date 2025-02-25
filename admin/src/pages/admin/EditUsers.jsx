import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const EditUsers = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [username, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [is_admin, setIsAdmin] = useState('');
    const [hotel_id, setIdHotel] = useState('');
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

    useEffect(()=> {
        getUser();
    },[]);

    const handleChange = (event) => {
        const name = event.target.name;
        name === 'username'?setNama(event.target.value):'';
        name === 'email'?setEmail(event.target.value):'';
        name === 'is_admin'?setIsAdmin(event.target.value):'';
        name === 'hotel_id'?setIdHotel(event.target.value):'';
    }
    const getUser = async () => {
        const response = await fetch("http://127.0.0.1:3000/api/users/" + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setNama(data.username);
        setEmail(data.email);
        setIsAdmin(data.is_admin);
        setIdHotel(data.hotel_id);
    }

    const handleUpdate =async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }
        const response = await fetch("http://127.0.0.1:3000/api/users/" + id, {
            method: "PUT",
            mode :"cors",
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`,
            },
            body: JSON.stringify(fData),
    });
            if (!response.ok) {
                console.log(error => console.error);
            }else {
                event.target.reset();
                Swal.fire({
                    icon: "success",
                    text: "Update Berhasil",
                    timer: 1000,
                }).then((res) => {
                    navigate( '/admin/users');
                });
        };
    }
    
  return (
    <div>
    <div className="container" style={{marginLeft:'25%',}}>
        <div className="row">
            <div className="col-md-5">
                <div className="card" style={{ marginTop:'10px'}}>
                    <div className="card-header">
                        <h2 className='text-center'>Edit Data User</h2>
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" className="form-control" value={username} onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' className="form-control" value={email} onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' className="form-control" />
                                <span className='text-danger' style={{fontSize:"14px"}}>Kosongkan jika tidak ingin mengubah password</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="is_admin">Role</label>
                                <select id='is_admin' name='is_admin' className="form-control" value={is_admin} onChange={handleChange} >
                                    <option >Pilih Role </option>
                                    <option value='user' >User</option>
                                    <option value='admin' >Admin</option>
                                    <option value='adminhotel'>Admin Hotel</option>
                                </select>
                            </div>
                            {/* Dropdown untuk memilih hotel */}
                  <div className="form-group">
                    <label htmlFor="hotel_id">Hotel</label>
                    <select id="hotel_id" name="hotel_id" className="form-control" value={hotel_id} onChange={handleChange}>
                      <option value="">Pilih Hotel</option>
                      {hotels.map((hotel) => (
                        <option key={hotel.id} value={hotel.id}>
                          {hotel.name}
                        </option>
                      ))}
                    </select>
                  </div>
                        </div>
                        <div className="card-footer" style={{display:"flex", gap:'20px', width:'100%'}}>
                        <Link to="/admin/users" style={{marginLeft:'18%'}} className="btn btn-primary float-start">Lihat Data</Link>
                            <button type="submit" className='btn btn-primary'>Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default EditUsers
