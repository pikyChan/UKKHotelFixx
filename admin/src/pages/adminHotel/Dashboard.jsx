import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Dashboard = () => {
  const username = localStorage.getItem("username") || "Admin";
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const hotelId = localStorage.getItem("hotelId");

  const [hotel, setHotel] = useState({
    name: "",
    city: "",
    address: "",
    distance: "",
    description: "",
    rating: "",
    cheapest_price: "",
    featured: "",
  });

  useEffect(() => {
    fetchHotelData();
  }, []);

  const fetchHotelData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/hotels/${hotelId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setHotel(data);
    } catch (error) {
      console.error("Gagal mengambil data hotel", error);
    }
  };

  const handleChange = (event) => {
    setHotel({ ...hotel, [event.target.name]: event.target.value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/hotels/${hotelId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(hotel),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          text: "Update Berhasil",
          timer: 1000,
          showConfirmButton: false,
        });
        fetchHotelData();
      } else {
        Swal.fire({ icon: "error", text: "Gagal memperbarui data" });
      }
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  return (
    <div >
      <div className="container">
      <div className="row justify-content-center ">
        <div className="col-lg-10">
          <div className="card shadow p-4 border-0 rounded">
          <h2 className="text-center fw-bold" style={{ 
  background: "linear-gradient(90deg, #007bff, #6610f2)", 
  WebkitBackgroundClip: "text", 
  WebkitTextFillColor: "transparent", 
  fontSize: "2rem",
  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
  animation: "fadeIn 1.5s ease-in-out"
}}>
  👋 Selamat Datang, <span className="text-dark">{username}</span>!
</h2>

<p className="text-center text-muted" style={{
  fontSize: "1.1rem", 
  fontWeight: "500", 
  animation: "fadeIn 2s ease-in-out"
}}>
  🚀 Kelola reservasi hotel & edit informasi hotel langsung dari sini dengan mudah!
</p>

<style>
  {`
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(-10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `}
</style>


            {/* Form Edit Hotel */}
            <h4 className="mt-4 text-secondary">📝 Lengkapi Data Hotel Anda!!</h4>
            <form onSubmit={handleUpdate} className="mt-3">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">🏨 Hotel Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control border border-primary"
                    value={hotel.name}
                    onChange={handleChange}
                    placeholder="Nama hotel"
                  />

                  <label className="form-label fw-bold mt-2">🌆 City</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control border border-primary"
                    value={hotel.city}
                    onChange={handleChange}
                    placeholder="Kota"
                  />

                  <label className="form-label fw-bold mt-2">📍 Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control border border-primary"
                    value={hotel.address}
                    onChange={handleChange}
                    placeholder="Alamat lengkap"
                  />

                  <label className="form-label fw-bold mt-2">
                    📏 Distance to City Center
                  </label>
                  <input
                    type="text"
                    name="distance"
                    className="form-control border border-primary"
                    value={hotel.distance}
                    onChange={handleChange}
                    placeholder="Jarak ke pusat kota"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">📝 Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control border border-primary"
                    value={hotel.description}
                    onChange={handleChange}
                    placeholder="Deskripsi hotel"
                  />

                  <label className="form-label fw-bold mt-2">⭐ Rating</label>
                  <input
                    type="number"
                    name="rating"
                    className="form-control border border-primary"
                    value={hotel.rating}
                    onChange={handleChange}
                    placeholder="Rating hotel (1-5)"
                    min="1"
                    max="5"
                  />

                  <label className="form-label fw-bold mt-2">💰 Cheapest Price</label>
                  <input
                    type="number"
                    name="cheapest_price"
                    className="form-control border border-primary"
                    value={hotel.cheapest_price}
                    onChange={handleChange}
                    placeholder="Harga termurah"
                  />

                  <label className="form-label fw-bold mt-2">🏆 Featured</label>
                  <select
                    name="featured"
                    className="form-control border border-primary"
                    value={hotel.featured}
                    onChange={handleChange}
                  >
                    <option value="0">False</option>
                    <option value="1">True</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2 fw-bold shadow-sm"
                >
                  ✅ Simpan Perubahan
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

export default Dashboard;
