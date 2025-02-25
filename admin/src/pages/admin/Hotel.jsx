import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Hotel = () => {
  const [dataHotel, setHotel]= useState([])
  const token= localStorage.getItem("token")
  const tampilData=async()=>{
    const response= await fetch("http://127.0.0.1:3000/api/hotels",{
      headers:{Authorization:`Bearer ${token}` }
  })
  const data = await response.json();
  setHotel(data)
  }

  useEffect(()=>{
    tampilData()
  },[])
  
  const handleDelete=(id)=>{
    Swal.fire({
      title:"Yakin Mau Hapus ?",
      showCancelButton:true,
      confirmButtonText:"Yakin",
      denyButtonText:"Batal",
    }).then((result)=>{
      if(result.isConfirmed){
      fetch('http://127.0.0.1:3000/api/hotels/' + id,{
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
    <div className="content" >
      <div className="content-header" >
    <div className="container-fluid">
      <div className="row mb-2">
         <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0px', width:'930px' }}>
                <h1 style={{ margin: '0', fontWeight: '500',fontSize:'40px'  }}>Hotel</h1>
                  <Link to="/admin/addhotel"
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
      </div>
    </div>
  </div>
<div className="card" style={{ width: '99%', marginLeft:'10px', marginRight:'10px' }}>
        <table className="table table-bordered table-hover" style={{ width: '100%', textAlign: 'center', marginTop:'0px', marginBottom:'-3PX' }}>
          <thead style={{ background: '#f2f2f2' }}>
            <tr style={{height:'0px'}}>
              <th style={{alignContent:'center', width: '50px', fontSize:'14px' }}>No</th>
              <th style={{alignContent:'center', fontSize:'14px'}}>Name</th>
              <th style={{alignContent:'center', fontSize:'14px'}}>City</th>
              <th style={{alignContent:'center', fontSize:'14px'}}>Adrress</th>
              <th style={{alignContent:'center', fontSize:'14px'}}>Distance</th>
              <th style={{alignContent:'center', fontSize:'14px'}}>Photo</th>
              <th style={{alignContent:'center', fontSize:'14px'}}>Description</th>
              <th style={{alignContent:'center', fontSize:'14px'}}>Rating</th>
              <th style={{alignContent:'center', fontSize:'14px'}}>Cheapest Price</th>
              <th style={{  alignContent:'center', fontSize:'14px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
              {dataHotel.length > 0 ? (dataHotel.map((item, index) => (
              <tr key={item} >
                <td style={{alignContent:'center', fontSize:'14px'}}>{index + 1}</td>
                <td style={{alignContent:'center', fontSize:'14px'}}>{item.name}</td>
                <td style={{alignContent:'center', fontSize:'14px'}}>{item.city}</td>
                <td style={{alignContent:'center', fontSize:'14px'}}>{item.address}</td>
                <td style={{alignContent:'center', fontSize:'14px'}}>{item.distance}</td>
                <td>
                  <img
                    alt={item.name}
                    className="object-cover"
                    style={{ borderRadius: '10px', width: '100px', height: '70px' }} // Set width to 100px
                    src={`http://localhost:3000/api/uploads/${item.photos}`} // Referensi ke gambar yang di-upload
                   
                  />
                </td>
                <td style={{alignContent:'center', fontSize:'14px'}}>{item.description}</td>
                <td style={{alignContent:'center', fontSize:'14px'}}>{item.rating}</td>
                <td style={{alignContent:'center', fontSize:'14px'}}>Rp.{item.cheapest_price}</td>
                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Link
                  to={`/admin/edithotel/${item.id}`}
                    className="btn btn-success" 
                    style={{ marginRight: '8px', borderRadius: '8px', background: '#4CAF50', padding: '6px 12px', fontSize: '15px' }}>
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '0px', fontSize: '13px' }} />
                    
                  </Link>
                  
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(item.id)} 
                    style={{ borderRadius: '8px', background: '#f44336', padding: '6px 12px', fontSize: '15px' }}>
                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: '0px', fontSize: '13px' }} />
                   
                  </button>
                </td>
              </tr>
            ))):(
              <td colSpan={9} >Data Kosong</td>
            )}
          </tbody>
        </table>
        </div>
      </div>
   
  )
}

export default Hotel
