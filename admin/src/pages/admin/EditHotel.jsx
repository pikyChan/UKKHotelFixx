import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const EditHotel = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [distance, setDistance] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [cheapest_price, setCheapestPrice] = useState('');
    const [featured, setFeatured] = useState('');
    const token = localStorage.getItem('token');

    useEffect(()=> {
        getUser();
    },[]);

    const handleChange = (event) => {
        const name = event.target.name;
        name === 'name'?setName(event.target.value):'';
        name === 'city'?setCity(event.target.value):'';
        name === 'address'?setAddress(event.target.value):'';
        name === 'distance'?setDistance(event.target.value):'';
        name === 'description'?setDescription(event.target.value):'';
        name === 'rating'?setRating(event.target.value):'';
        name === 'cheapest_price'?setCheapestPrice(event.target.value):'';
        name === 'featured'?setFeatured(event.target.value):'';
    }
    const getUser = async () => {
        const response = await fetch("http://127.0.0.1:3000/api/hotels/" + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        setName(data.name);
        setCity(data.city);
        setAddress(data.address);
        setDistance(data.distance);
        setDescription(data.description);
        setRating(data.rating);
        setCheapestPrice(data.cheapest_price);
        setFeatured(data.featured);
    }

    const handleUpdate =async (event) => {
        event.preventDefault();
        const fData = {};
        const frmel = event.target;
        for (let el of frmel.elements) {
            fData[el.name] = el.value;
        }
        const response = await fetch("http://127.0.0.1:3000/api/hotels/" + id, {
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
                    navigate( '/admin/hotel');
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
                        <h2 className='text-center'>Edit Data Hotel</h2>
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className="card-body">
                        <div className="form-group">
                                    <label htmlFor="name">Hotel Name</label>
                                    <input type="text" name="name" className="form-control" value={name} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input type="text" name='city' className="form-control" value={city} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" name='address' className="form-control" value={address} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="distance">Distance</label>
                                    <input type="text" name="distance" className="form-control" value={distance} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea rows="3" name="description" className="form-control" value={description} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rating">Rating</label>
                                    <input type="number" name="rating" className="form-control" step="0.1" value={rating} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cheapest_price">Cheapest Price</label>
                                    <input type="number" name="cheapest_price" className="form-control" value={cheapest_price} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="featured">Featured</label>
                                    <select name='featured' className="form-control" value={featured} onChange={handleChange}>
                                        <option value=''>Pilih Featured</option>
                                        <option value='0'>False</option>
                                        <option value='1'>True</option>
                                    </select>
                                </div>
                        </div>
                        <div className="card-footer" style={{display:"flex", gap:'20px', width:'100%'}}>
                        <Link to="/admin/hotel" style={{marginLeft:'18%'}} className="btn btn-primary float-start">Lihat Data</Link>
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

export default EditHotel
