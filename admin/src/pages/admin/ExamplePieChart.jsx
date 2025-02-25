import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HotelChart = () => {
  const [data, setData] = useState([]);
  const [hotels, setHotels] = useState([]); // Menyimpan data hotel
  const token = localStorage.getItem("token");

  // Fungsi untuk mengambil daftar hotel
  const fetchHotels = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/hotels", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch hotels data");
      }

      const hotelData = await response.json();
      setHotels(hotelData); // Menyimpan data hotel
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };

  // Fungsi untuk mengambil data room numbers
  const fetchHotelData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/roomnumbers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch hotel data");
      }

      const hotelData = await response.json();

      // Format data untuk menghitung tamu berdasarkan hotel_id
      const purposeCount = hotelData.reduce((acc, item) => {
        const hotelId = item.hotel_id || 'Unknown';
        if (!acc[hotelId]) {
          acc[hotelId] = 0;
        }
        acc[hotelId]++;
        return acc;
      }, {});

      // Gabungkan nama hotel dengan data
      const formattedData = Object.entries(purposeCount).map(([hotelId, count]) => {
        // Mencari nama hotel berdasarkan hotelId
        const hotel = hotels.find(h => h.id === parseInt(hotelId)); // Pastikan ID hotel adalah angka
        return {
          name: hotel ? hotel.name : 'Unknown Hotel', // Menampilkan nama hotel atau 'Unknown Hotel' jika tidak ditemukan
          count,
        };
      });

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching guest book data:", error);
    }
  };

  useEffect(() => {
    fetchHotels(); // Ambil data hotel
  }, []);

  useEffect(() => {
    if (hotels.length > 0) {
      fetchHotelData(); // Ambil data roomnumbers hanya setelah data hotel berhasil diambil
    }
  }, [hotels]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HotelChart;
