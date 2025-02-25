import React, { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import TanggalKunjungChart from "./TanggalKunjungChart";
import ExamplePieChart from "../admin/ExamplePieChart";
import ExampleDonutChart from "../admin/ExampleDonutChart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Home = () => {
  const [RoomCount, setRoomCount] = useState(0);
  const [UsersCount, setUsersCount] = useState(0);
  const [HotelCount, setHotelCount] = useState(0);
  const [BookingCount, setBookingCount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [activeChart, setActiveChart] = useState("pie"); // "pie" untuk PieChart, "donut" untuk DonutChart
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setter(data.length);
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
      }
    };

    fetchData("http://127.0.0.1:3000/api/roomnumbers", setRoomCount);
    fetchData("http://127.0.0.1:3000/api/hotels", setHotelCount);
    fetchData("http://127.0.0.1:3000/api/bookings", setBookingCount);
    fetchData("http://127.0.0.1:3000/api/users", setUsersCount);
  }, []);

  return (
    <>
      {/* Content Header */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes */}
          <div className="row">
            <div className="col-lg-3 col-10">
              <div className="small-box bg-primary">
                <div className="inner">
                  <h3>{UsersCount}</h3>
                  <p>Users</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="/admin/users" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>

            <div className="col-lg-3 col-10">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{HotelCount}</h3>
                  <p>Total Hotel</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="/admin/hotel" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>

            <div className="col-lg-3 col-10">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{BookingCount}</h3>
                  <p>Booking</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="/admin/booking" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>

            <div className="col-lg-3 col-10">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{RoomCount}</h3>
                  <p>Total Kamar</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="/admin/roomnumber" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
              </div>
            </div>
          </div>

          {/* Main row */}
          <div className="row">
            {/* Left col - Data Type Kamar */}
            <section className="col-lg-7 connectedSortable">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-chart-pie mr-1" />
                    Data Type Kamar
                  </h3>
                  <div className="card-tools">
                    <ul className="nav nav-pills ml-auto">
                      <li className="nav-item">
                        <button 
                          className={`nav-link ${activeChart === "pie" ? "active" : ""}`} 
                          onClick={() => setActiveChart("pie")}
                          style={{ border: "none" }}
                        >
                          Area
                        </button>
                      </li>
                      <li className="nav-item">
                        <button 
                          className={`nav-link ${activeChart === "donut" ? "active" : ""}`} 
                          onClick={() => setActiveChart("donut")}
                          style={{ border: "none" }}
                        >
                          Donut
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body d-flex justify-content-center">
                  {activeChart === "pie" && <ExamplePieChart />}
                  {activeChart === "donut" && <ExampleDonutChart />}
                </div>
              </div>
            </section>

            {/* Right col - Calendar */}
            <section className="col-lg-5 connectedSortable">
              <div className="card bg-none-info">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    <i className="far fa-calendar-alt" /> Calendar
                  </h3>
                </div>
                <div className="card-body d-flex justify-content-center border-none">
                  <Calendar onChange={setDate} value={date}  />
                </div>
              </div>
            </section>
          </div>

          {/* Hotel di Setiap Kota */}
          <div className="card direct-chat direct-chat-primary">
            <div className="card-header">
              <h3 className="card-title">Hotel di Setiap Kota</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <TanggalKunjungChart />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
