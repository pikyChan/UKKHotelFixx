import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InstansiChart = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchHotelsData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/hotels", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch hotel data");
      }

      const hotelData = await response.json();

      // Count occurrences by "Asal Instansi"
      const hotelsCount = hotelData.reduce((acc, item) => {
        const hotel = item.city || 'Unknown';
        if (!acc[hotel]) {
          acc[hotel] = 0;
        }
        acc[hotel]++;
        return acc;
      }, {});

      // Convert to array format for the chart
      const formattedData = Object.entries(hotelsCount).map(([key, value]) => ({
        name: key,
        count: value,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching hotels data:", error);
    }
  };

  useEffect(() => {
    fetchHotelsData();
  }, []);

  return (
    <div style={{ width: '100%', height: 300, backgroundColor: 'none', padding: '10px', borderRadius: '8px' }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#000" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#000' }}
            label={{ value: '', position: 'insideBottomRight', offset: -5, fill: '#000' }}
          />
          <YAxis 
            tick={{ fill: '#000' }}
            label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: '#000' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#333333', borderColor: '#000', color: '#FFFFFF' }}
            itemStyle={{ color: '#FFFFFF' }}
            labelStyle={{ color: '#FFFFFF' }}
          />
          <Area type="monotone" dataKey="count" stroke="#000" fill="#000" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InstansiChart;
