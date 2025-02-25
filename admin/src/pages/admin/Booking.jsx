import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Booking = () => {
  const [dataBooking, setBooking] = useState([]);
  const token = localStorage.getItem("token");
   const [users, setUsers] = useState([]);
   const [rooms, setRooms] = useState([]);
   const [hotels, setHotels] = useState([]);
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
              const fetchHotels = async () => {
                  try {
                      const response = await fetch("http://127.0.0.1:3000/api/hotels", {
                          headers: { Authorization: `Bearer ${token}` }
                      });
                      const data = await response.json();
                      setHotels(data);
                  } catch (error) {
                      console.error("Error fetching hotelss:", error);
                  }
              };
              fetchHotels();
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
  

  const tampilData = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setBooking(data);
  };

  useEffect(() => {
    tampilData();
  }, []);

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
                  <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Booking</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card"
        style={{  width: "100%", marginLeft: "0px", marginRight: "0px" }}
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
                  fontSize: "13px",
                }}
              >
                No
              </th>
              <th style={{ alignContent: "center", fontSize: "13px" }}>
                Name User
              </th>
              <th style={{ alignContent: "center", fontSize: "13px" }}>
                Name Hotel
              </th>
              <th style={{ alignContent: "center", fontSize: "13px" }}>
                Room Type{" "}
              </th>
              <th style={{ alignContent: "center", fontSize: "13px" }}>
                Room Number
              </th>
              <th style={{ alignContent: "center", fontSize: "13px" }}>
                Check In
              </th>
              <th style={{ alignContent: "center", fontSize: "13px" }}>
                Check Out
              </th>
              <th style={{ alignContent: "center", fontSize: "13px" }}>
                Total Price
              </th>
              <th style={{ alignContent: "center", fontSize: "13px" }}>
                Payment Method
              </th>
              <th style={{ alignContent: "center", fontSize: "13px" }}>
                Status
              </th>

              <th
                style={{
                  width: "200px",
                  alignContent: "center",
                  fontSize: "13px",
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
                  <td style={{ alignContent: "center", fontSize: "13px" }}>
                    {index + 1}
                  </td>
                  <td style={{alignContent:'center', fontSize:'13px'}}>
                  {users.find(user => user.id === item.user_id)?.username}
                </td>
                <td style={{alignContent:'center', fontSize:'13px'}}>
                  {hotels.find(hotel => hotel.id === item.hotel_id)?.name}
                </td>
                <td style={{alignContent:'center', fontSize:'13px'}}>
                  {rooms.find(room => room.id === item.room_id)?.title}
                </td>
                <td style={{alignContent:'center', fontSize:'13px'}}>
                  {roomNums.find(roomNum => roomNum.id === item.room_number)?.room_number}
                </td>
                  <td className="d-none d-md-table-cell"  style={{ alignContent: "center", fontSize: "13px" }}>
                    {new Date(item.check_in).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="d-none d-md-table-cell" style={{ alignContent: "center", fontSize: "13px" }}>
                    {new Date(item.check_out).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td style={{ alignContent: "center", fontSize: "13px" }}>
                    Rp.{item.total_price}
                  </td>
                  <td style={{ alignContent: "center", fontSize: "13px" }}>
                    {item.payment_method}
                  </td>

                  <td style={{ alignContent: "center", fontSize: "13px" }}>
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
                      to={`/admin/booking/${item.id}`}
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
