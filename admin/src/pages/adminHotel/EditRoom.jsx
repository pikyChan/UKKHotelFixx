import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const EditRoomHotel = () => {
    const navigate = useNavigate();
    const {id} = useParams();
   
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [max_people, setMaxPeople] = useState('');
    const [description, setDescription] = useState('');
    const token = localStorage.getItem('token');

    const handleChange = (event) => {
        const { name, value } = event.target;
       
        if (name === 'title') setTitle(value);
        if (name === 'price') setPrice(value);
        if (name === 'max_people') setMaxPeople(value);
        if (name === 'description') setDescription(value);
    };
    
     useEffect(()=> {
            getRoom();
        },[]);

    const getRoom = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/rooms/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error("Gagal mengambil data");
            }
    
            const data = await response.json();
            const roomData = Array.isArray(data) ? data[0] : data; // Jika API mengembalikan array
            
            setTitle(roomData.title || '');
            setPrice(roomData.price || '');
            setMaxPeople(roomData.max_people || '');
            setDescription(roomData.description || '');
        } catch (error) {
            console.error("Error fetching room data:", error);
        }
    };
    

    const handleUpdate =async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }
        const response = await fetch("http://127.0.0.1:3000/api/rooms/" + id, {
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
                    navigate( '/adminhotel/roomhotel');
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
                        <h2 className='text-center'>Edit Data Room</h2>
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" name='title' className="form-control" value={title} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input type="text" name='price' className="form-control" value={price} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="max_people">Max People</label>
                                    <input type="number" name="max_people" className="form-control" value={max_people} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" name="description" className="form-control" value={description} onChange={handleChange} />
                                </div>
                                
                        </div>
                        <div className="card-footer" style={{display:"flex", gap:'20px', width:'100%'}}>
                        <Link to="/adminhotel/roomhotel" style={{marginLeft:'18%'}} className="btn btn-primary float-start">Lihat Data</Link>
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

export default EditRoomHotel
