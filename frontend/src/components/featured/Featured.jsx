import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./featured.scss";

const Featured = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cities = ["bandung", "bogor", "surabaya", "jakarta"];

  const cityImages = {
    bandung: "/src/assets/bandung.jpg",
    bogor: "/src/assets/bogor.jpg",
    surabaya: "/src/assets/surabaya.jpg",
    jakarta: "/src/assets/jakarta.jpg"
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/hotels`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
  
        // Buat objek untuk menghitung jumlah hotel berdasarkan kota
        const hotelCountByCity = cities.reduce((acc, city) => {
          acc[city] = result.filter(hotel => hotel.city.toLowerCase() === city).length;
          return acc;
        }, {});
  
        // Konversi objek ke array sesuai urutan cities
        const cityCounts = cities.map(city => hotelCountByCity[city] || 0);
  
        setData(cityCounts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(new Array(cities.length).fill(0)); // Isi dengan nol jika error
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="container">
      <h1 className="homeTitle mb-3">Property by Cities</h1>
      <div className="featured row gy-3 gx-md-3 gx-3 justify-content-center">
        {loading ? (
          <div className="lds-roller">
            {[...Array(8)].map((_, i) => <div key={i}></div>)}
          </div>
        ) : (
          cities.map((city, index) => (
            <div className="col-md-6 col-lg-3 col-6" key={city}>
              <div
                className="featuredItem"
                onClick={() => navigate("/hotels", { state: { destination: city } })}
              >
                <img
                  src={cityImages[city]}
                  alt={city}
                  className="featuredImg img-fluid"
                />
                <div className="featuredTitles">
                  <h1>{city.charAt(0).toUpperCase() + city.slice(1)}</h1>
                  <h2>{data?.[index] ?? 0} properties</h2> {/* Hindari undefined */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Featured;