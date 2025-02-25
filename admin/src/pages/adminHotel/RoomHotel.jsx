import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const RoomHotel = () => {
    const hotel_id = localStorage.getItem("hotelId");
  const [dataRoom, setRoom]= useState([])
  const token= localStorage.getItem("token")
 
  const tampilData=async()=>{
    const response= await fetch(`http://127.0.0.1:3000/api/rooms/hotel/${hotel_id}`,{
      headers:{Authorization:`Bearer ${token}` }
  })
  const data = await response.json();
  setRoom(data)
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
      fetch('http://127.0.0.1:3000/api/rooms/' + id,{
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
        
         <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0px', width:'970px' }}>
                        <h1 style={{ margin: '0', fontWeight: '500',fontSize:'40px'  }}>Room</h1>
                          <Link to="/adminhotel/addroomhotel"
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
<div className="card" style={{ width: '98%', marginLeft:'10px', marginRight:'20px' }}>
        <table className="table table-bordered table-hover" style={{ width: '100%', textAlign: 'center', marginTop:'0px', marginBottom:'-3PX' }}>
          <thead style={{ background: '#f2f2f2' }}>
            <tr style={{height:'0px'}}>
              <th style={{alignContent:'center', width: '50px', fontSize:'14px' }}>No</th>
              <th style={{alignContent:'center', fontSize:'14px'}}>Type</th>
              <th style={{alignContent:'center', fontSize:'14px'}}>Price</th>
              <th style={{alignContent:'center', fontSize:'14px'}}>Max People</th>
              <th style={{alignContent:'center', fontSize:'14px'}}>Description</th>
             
              <th style={{ width: '200px', alignContent:'center', fontSize:'14px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
              {dataRoom.length > 0 ? (dataRoom.map((item, index) => (
              <tr key={item} >
                <td style={{alignContent:'center', fontSize:'14px'}}>{index + 1}</td>          
                <td style={{alignContent:'center', fontSize:'14px'}}>{item.title}</td>
                <td style={{alignContent:'center', fontSize:'14px'}}>Rp.{item.price}</td>
                <td style={{alignContent:'center', fontSize:'14px'}}>{item.max_people}</td>
          
                <td style={{alignContent:'center', fontSize:'14px'}}>{item.description}</td>
                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Link
                  to={`/adminhotel/editroomhotel/${item.id}`}
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
              <td colSpan={9} >Data Kosong</td>
            )}
          </tbody>
        </table>
        </div>
      </div>
   
  )
}

export default RoomHotel
