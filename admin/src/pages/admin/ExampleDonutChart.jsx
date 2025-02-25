import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';

const HotelChart = () => {
  const [data, setData] = useState([]);
  const [hotels, setHotels] = useState([]); // Store hotel data
  const token = localStorage.getItem("token");

  // Fetch hotel data
  const fetchHotels = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/hotels", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch hotels data");
      }

      const hotelData = await response.json();
      setHotels(hotelData); // Save hotel data
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };

  // Fetch room numbers data
  const fetchHotelData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/roomnumbers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch guest book data");
      }

      const hotelData = await response.json();

      // Count guests by hotel_id
      const purposeCount = hotelData.reduce((acc, item) => {
        const hotelId = item.hotel_id || 'Unknown';
        if (!acc[hotelId]) {
          acc[hotelId] = 0;
        }
        acc[hotelId]++;
        return acc;
      }, {});

      // Format data with hotel names
      const formattedData = Object.entries(purposeCount).map(([hotelId, value]) => {
        // Find the hotel name from the hotels data
        const hotel = hotels.find(h => h.id === parseInt(hotelId));
        return {
          name: hotel ? hotel.name : 'Unknown Hotel', // Use hotel name, or fallback to 'Unknown Hotel'
          value,
        };
      });

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching guest book data:", error);
    }
  };

  // Run fetchHotelData when the component mounts
  useEffect(() => {
    fetchHotels(); // Fetch hotel data first
  }, []);

  // Once hotel data is available, fetch room number data
  useEffect(() => {
    if (hotels.length > 0) {
      fetchHotelData();
    }
  }, [hotels]);

  // Define colors for pie chart slices
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Tooltip />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="45%"
          cy="50%"
          outerRadius={110} // Increase outer radius for a larger donut
          innerRadius={80}  // Set inner radius for the donut effect
          fill="#8884d8"
          labelLine={false} // Disable label line for better positioning
          label={({ name, percent }) => `${name}: ${Math.round(percent * 100)}%`} // Custom label for outside
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          {/* Add a Label to show total count or any other info */}
          <Label value="Room Data by Hotel" position="center" fontSize={18} />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default HotelChart;
