import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Booking = () => {
  const [dataBooking, setBooking] = useState([]);
  const hotel_id = localStorage.getItem("hotelId");
  const token = localStorage.getItem("token");
   const [users, setUsers] = useState([]);
   const [rooms, setRooms] = useState([]);
   const [roomNums, setRoomNums] = useState([]);
            
            useEffect(() => {
                const fetchUsers = async () => {
                    try {
                        const response = await fetch("http://127.0.0.1:3000/api/users", {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        const data = await response.json();
                        setUsers(data);
                    } catch (error) {
                        console.error("Error fetching users:", error);
                    }
                };
                fetchUsers();
            }, [token]);
        
            useEffect(() => {
                const fetchRooms = async () => {
                    try {
                        const response = await fetch("http://127.0.0.1:3000/api/rooms", {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        const data = await response.json();
                        setRooms(data);
                    } catch (error) {
                        console.error("Error fetching rooms:", error);
                    }
                };
                fetchRooms();
            }, [token]);
        
            useEffect(() => {
              const fetchRoomNums = async () => {
                  try {
                      const response = await fetch("http://127.0.0.1:3000/api/roomnumbers", {
                          headers: { Authorization: `Bearer ${token}` }
                      });
                      const data = await response.json();
                      setRoomNums(data);
                  } catch (error) {
                      console.error("Error fetching room numbers:", error);
                  }
              };
              fetchRoomNums();
          }, [token]);
  

          useEffect(() => {
            if (hotel_id) {
              tampilData();
            } else {
              console.warn("Hotel ID tidak ditemukan di localStorage.");
            }
          }, [hotel_id]);
          
          const tampilData = async () => {
            try {
              const response = await fetch(
                `http://127.0.0.1:3000/api/bookings/hotel/${hotel_id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
          
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
          
              const text = await response.text();
          
              if (!text) {
                console.warn("Response body kosong");
                setBooking([]);
                return;
              }
          
              const data = JSON.parse(text);
              console.log("Bookings sebelum set:", data);
          
              // Jika data berupa objek, ubah menjadi array
              setBooking(Array.isArray(data) ? data : [data]);
          
              console.log("Bookings setelah set:", Array.isArray(data) ? data : [data]);
            } catch (error) {
              console.error("Error fetching bookings:", error);
              setBooking([]);
            }
          };
          

  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin Mau Hapus ?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      denyButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://127.0.0.1:3000/api/bookings/" + id, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((res) => {
            tampilData();
          });
      }
    });
  };
  return (
    <div className="content">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0" style={{ fontSize: "35px" }}>
                Booking
              </h1>
            </div>
            <div className="col-sm-6" style={{ marginTop: "10px" }}>
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/adminhotel/dashboardhotel">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Booking</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card"
        style={{ width: "98%", marginLeft: "10px", marginRight: "20px" }}
      >
        <table
          className="table table-bordered table-hover"
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "0px",
            marginBottom: "-3PX",
          }}
        >
          <thead style={{ background: "#f2f2f2" }}>
            <tr style={{ height: "0px" }}>
              <th
                style={{
                  alignContent: "center",
                  width: "50px",
                  fontSize: "14px",
                }}
              >
                No
              </th>
              <th style={{ alignContent: "center", fontSize: "14px" }}>
                Name User
              </th>
              <th style={{ alignContent: "center", fontSize: "14px" }}>
                Room Type{" "}
              </th>
              <th style={{ alignContent: "center", fontSize: "14px" }}>
                Room Number
              </th>
              <th style={{ alignContent: "center", fontSize: "14px" }}>
                Check In
              </th>
              <th style={{ alignContent: "center", fontSize: "14px" }}>
                Check Out
              </th>
              <th style={{ alignContent: "center", fontSize: "14px" }}>
                Total Price
              </th>
              <th style={{ alignContent: "center", fontSize: "14px" }}>
                Payment Method
              </th>
              <th style={{ alignContent: "center", fontSize: "14px" }}>
                Status
              </th>

              <th
                style={{
                  width: "100px",
                  alignContent: "center",
                  fontSize: "14px",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {dataBooking.length > 0 ? (
              dataBooking.map((item, index) => (
                <tr key={item}>
                  <td style={{ alignContent: "center", fontSize: "14px" }}>
                    {index + 1}
                  </td>
                  <td style={{alignContent:'center', fontSize:'14px'}}>
                  {users.find(user => user.id === item.user_id)?.username}
                </td>
                <td style={{alignContent:'center', fontSize:'14px'}}>
                  {rooms.find(room => room.id === item.room_id)?.title}
                </td>
                <td style={{alignContent:'center', fontSize:'14px'}}>
                  {roomNums.find(roomNum => roomNum.id === item.room_number)?.room_number}
                </td>
                  <td className="d-none d-md-table-cell"  style={{ alignContent: "center", fontSize: "14px" }}>
                    {new Date(item.check_in).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="d-none d-md-table-cell" style={{ alignContent: "center", fontSize: "14px" }}>
                    {new Date(item.check_out).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td style={{ alignContent: "center", fontSize: "14px" }}>
                    Rp.{item.total_price}
                  </td>
                  <td style={{ alignContent: "center", fontSize: "14px" }}>
                    {item.payment_method}
                  </td>

                  <td style={{ alignContent: "center", fontSize: "14px" }}>
                    {item.status}
                  </td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      to={`/adminhotel/bookinghotel/${item.id}`}
                      className="btn btn-success"
                      style={{
                        marginRight: "8px",
                        borderRadius: "8px",
                        background: "#4CAF50",
                        padding: "6px 12px",
                        fontSize: "15px",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{ marginRight: "0px", fontSize: "13px" }}
                      />
                    </Link>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                      style={{
                        borderRadius: "8px",
                        background: "#f44336",
                        padding: "6px 12px",
                        fontSize: "15px",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ marginRight: "0px", fontSize: "13px" }}
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <td colSpan={11}>Data Kosong</td>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
