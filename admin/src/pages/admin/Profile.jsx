import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id'); // Get user ID from localStorage
  const token = localStorage.getItem('token'); // Get token from localStorage
  const [username, setNama] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setNama(value);
    if (name === 'email') setEmail(value);
  };

  const getUser = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();
      setNama(data.username);
      setEmail(data.email);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const fData = {
      username,
      email,
      password: event.target.password.value,
    };
  
    console.log("Form data being sent:", fData); // Check if `nama` and `email` have the updated values
  
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fData),
      });
  
      if (!response.ok) throw new Error('Update failed');
  
      Swal.fire({
        icon: 'success',
        text: 'Update Berhasil. Silakan login kembali untuk melihat perubahan.',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/logout');
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  return (
    <div>
      {/* Content Header */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Profile</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
                <li className="breadcrumb-item active">User Profile</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img className="profile-user-img img-fluid img-circle" src="https://i.pinimg.com/564x/d0/7b/a6/d07ba6dcf05fa86c0a61855bc722cb7a.jpg" alt="User profile" />
                  </div>
                  <h3 className="profile-username text-center">{username}</h3>
                  <p className="text-muted text-center">Admin RESERVA</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-8">
              <div className="card ">
                <div className="">
                  
                   
                      <a >Edit Profile</a>
                      <hr />
                      <form onSubmit={handleUpdate} >
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="username">Nama</label>
                            <input
                              type="text"
                              name="username"
                              className="form-control"
                              value={username}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              value={email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                            />
                            <span className="text-danger" style={{ fontSize: '14px' }}>
                              Kosongkan jika tidak ingin mengubah password
                            </span>
                          </div>
                        </div>
                        <div className="card-footer">
                          <button type="submit" className="btn btn-primary">Simpan</button>
                        </div>
                      </form>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
