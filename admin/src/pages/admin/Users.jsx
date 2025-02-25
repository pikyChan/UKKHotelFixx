import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Users = () => {
  const [dataUser, setUsers]= useState([])
  const token= localStorage.getItem("token")
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
  
  const tampilData=async()=>{
    const response= await fetch("http://127.0.0.1:3000/api/users",{
      headers:{Authorization:`Bearer ${token}` }
  })
  const data = await response.json();
  setUsers(data)
  }
  useEffect(()=>{
    tampilData()
  },[])
  const handleDelete=(id)=>{
    Swal.fire({
      title:"Yakin Hapus Data ?",
      showCancelButton:true,
      confirmButtonText:"Yakin",
      denyButtonText:"Batal",
    }).then((result)=>{
      if(result.isConfirmed){
      fetch('http://127.0.0.1:3000/api/users/' + id,{
        method:"DELETE", 
        headers:{Authorization:`Bearer ${token}` }
      }).then(response=>response.json())
      .then(res=>{
        tampilData()
      })
    }
    })
  }
  return (
       <div className="content" style={{ width: '900px'}}>
      <div className="card-body">
      <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0px', width:'930px' }}>
        <h1 style={{ margin: '0', fontWeight: '500' }}>Users</h1>
          <Link to="/admin/addusers"
            style={{
            borderRadius: '8px',
            background: '#007bff',
            padding: '6px 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40px',
            width: '150px',
            border: 'none',
            color: '#fff',
            textDecoration: 'none',
            }}
          >
    <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px', color: '#ffffff' }} />
    Tambah Data
  </Link>
</div>
<div className="card" style={{margin:'20px 0px 0px 0px', width: '110%' }}>
        <table className="table table-bordered table-hover " style={{ width: '100%', textAlign: 'center', marginTop:'0px', marginBottom:'-3px' }}>
          <thead style={{ background: '#f2f2f2' }}>
            <tr>
              <th style={{ width: '50px', alignContent:'center' }}>No</th>
              <th style={{alignContent:'center'}} >Username</th>
              <th  style={{alignContent:'center'}}>Email</th>
              <th  style={{alignContent:'center'}}>Role</th>
              <th  style={{alignContent:'center'}}>Nama Hotel</th>
              <th style={{ width: '200px' }} >Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataUser.length > 0 ? (dataUser.map((item, index) => (
              <tr key={item.id}>
                <td  style={{alignContent:'center'}}>{index + 1}</td>
                <td  style={{alignContent:'center'}}>{item.username}</td>
                <td  style={{alignContent:'center'}}>{item.email}</td>
                <td  style={{alignContent:'center'}}>{item.is_admin}</td>
                <td style={{ textAlign: 'center', fontSize: '14px' }}>
  {hotels.find(hotel => hotel.id === item.hotel_id)?.name || '-'}
</td>


                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Link
                  to={`/admin/edituser/${item.id}`}
                    className="btn btn-success" 
                    style={{ marginRight: '8px', borderRadius: '8px', background: '#4CAF50', padding: '6px 12px', fontSize: '15px' }}>
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px', fontSize: '13px' }} />
                    Edit
                  </Link>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(item.id)} 
                    style={{ borderRadius: '8px', background: '#f44336', padding: '6px 12px', fontSize: '15px' }}>
                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px', fontSize: '13px' }} />
                    Hapus
                  </button>
                </td>
              </tr>
            ))):(
              <tr>
              <td colSpan={5}>Data Kosong</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}

export default Users
