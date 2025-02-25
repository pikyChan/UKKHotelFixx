import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Logout = () => {
  const [error, setError] = useState(null); 

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
    
        Swal.fire({
          title: 'Logging out...',
          text: 'Please wait',
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });

        localStorage.removeItem('token'); 
        localStorage.removeItem('username');
        localStorage.setItem('isLoggedIn', 'false'); 

        const response = await fetch('http://localhost:3000/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });
    
        if (response.ok) {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Logged out!',
            text: 'You have been logged out successfully.',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = '/';
          });
        } else {
          console.error('Logout gagal:', response.statusText);
          setError('Logout failed, please try again.');
          Swal.close();
          Swal.fire('Error', 'Logout failed, please try again.', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Logout error, please try again.');
        Swal.close();
        Swal.fire('Error', 'Logout error, please try again.', 'error');
      }
    };
    
    handleLogout();
  }, []);

  return null;
};

export default Logout;
