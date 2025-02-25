import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.scss";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import success from "./success-svgrepo-com.svg";

// Helper function to format the date
const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];  // Converts to YYYY-MM-DD format
};

// Function to calculate the total price based on days and room price
const calculateTotalPrice = (checkInDate, checkOutDate, roomPrice) => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const days = Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24)); // Get number of days
  return days * roomPrice;  // No need for room count anymore
};

const Reserve = ({ setOpen, hotel_id, room_id, user_id }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomNumberData, setRoomNumberData] = useState(null);
  const { dates } = useContext(SearchContext);
  const [modal, setModal] = useState(false);
  const [copy, setCopy] = useState(false);
  const [checkInDate, setCheckInDate] = useState(""); // New state for check-in date
  const [checkOutDate, setCheckOutDate] = useState(""); // New state for check-out date
  const [totalPrice, setTotalPrice] = useState(0); // Total price of the booking
  const navigate = useNavigate();

  const finalUserId = user_id || localStorage.getItem("user_id");

  useEffect(() => {
    if (!room_id) {
      console.error("room_id is undefined!");
      return;
    }

    const fetchRoomNumberData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/roomnumbers/type/${room_id}`);
        if (res.data && res.data.length > 0) {
          setRoomNumberData(res.data);
        } else {
          console.warn("No room numbers available!");
          setRoomNumberData([]);
        }
      } catch (err) {
        console.error("Error fetching room number data:", err);
        setRoomNumberData(null);
      }
    };

    fetchRoomNumberData();
  }, [room_id]);

  useEffect(() => {
    if (!hotel_id) {
      console.error("hotel_id is undefined!");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/rooms/hotel/${hotel_id}`);
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hotel_id]);

  const handleSelect = async (e) => {
    const { value } = e.target;
    const room = data.find((item) => String(item.id) === String(value));

    if (!room) {
      console.error("Selected room not found!");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/api/roomnumbers/type/${room.id}`);
      let roomNumbers = Array.isArray(res.data) ? res.data : [res.data];

      const availableRoom = roomNumbers.find((r) => r.status === "available");

      if (availableRoom) {
        const existingRoom = selectedRooms.find((r) => r.room_id === room.id);
        
        if (existingRoom) {
          setSelectedRooms(selectedRooms.filter((r) => r.room_id !== room.id));
        } else {
          setSelectedRooms([
            ...selectedRooms,
            {
              user_id: finalUserId,
              hotel_id,
              room_id: room.id,
              id: availableRoom.id,
              total_price: room.price,
              check_in: checkInDate || "",  // Use manual check-in date if provided
              check_out: checkOutDate || "", // Use manual check-out date if provided
              payment_method: "Credit Card",
              status: "Pending",
              booking_id: Math.random().toString(36).substring(2, 12),
            },
          ]);
        }
      } else {
        console.warn("No available room numbers for selected room!");
      }
    } catch (err) {
      console.error("Error fetching room number:", err);
    }
  };

  useEffect(() => {
    if (checkInDate && checkOutDate && data.length > 0) {
      // Recalculate total price whenever dates or selected rooms change
      const calculatedPrice = calculateTotalPrice(
        checkInDate,
        checkOutDate,
        data[0].price // Assuming we are using the first room's price for calculation
      );
      setTotalPrice(calculatedPrice);
    }
  }, [checkInDate, checkOutDate, data]);

  const handleClick = async () => {
    if (!finalUserId || selectedRooms.length === 0) {
      console.error("User ID or selectedRooms not available!");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      console.error("Check-in or check-out date is missing!");
      return;
    }

    const formattedCheckInDate = formatDate(checkInDate);
    const formattedCheckOutDate = formatDate(checkOutDate);

    try {
      for (let room of selectedRooms) {
        const booking = {
          user_id: finalUserId,
          hotel_id,
          room_id: room.room_id,
          room_number: room.id,
          total_price: totalPrice, // Use calculated total price
          check_in: formattedCheckInDate,  // Use formatted date
          check_out: formattedCheckOutDate, // Use formatted date
          payment_method: "Credit Card",
          status: "Pending",
        };

        const res = await axios.post("http://localhost:3000/api/bookings", booking);
        console.log("Booking response:", res.data);

        await axios.put(`http://localhost:3000/api/roomnumbers/status/${room.id}`, {
          status: "booked",
        });
      }

      setModal(true);
    } catch (err) {
      console.error("Error creating bookings:", err.response ? err.response.data : err);
    }
  };

  return (
    <div className="reserve">
      <ToastContainer autoClose={500} />
      <div className="rContainer">
  {!modal && (
    <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
  )}
  {!modal ? (
    <div>
      <span>Select your room types:</span>
      {loading ? (
        <div className="d-flex justify-content-center"><div className="lds-hourglass"></div></div>
      ) : (
        data.length > 0 ? (
          <div className="rItemsContainer">
            {data.map((item) => (
              <div className="rItem" key={item.id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.description}</div>
                  <div className="rMax">Max people: <b>{item.max_people}</b></div>
                  <div className="rPrice">Rp. {item.price}</div>
                </div>
                <div className="rSelectRooms">
                  <input
                    type="checkbox"
                    name="selectedRoom"
                    value={item.id}
                    onChange={handleSelect}
                    checked={selectedRooms.some((r) => r.room_id === item.id)}
                  />
                  <label>Select this room</label>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No room types available.</p>
        )
      )}
      {selectedRooms.length > 0 && (
        <div className="datesContainer">
          <div className="dateWrapper">
            <label htmlFor="checkInDate" className="dateLabel">Check-in Date:</label>
            <input
              id="checkInDate"
              type="date"
              className="dateInput"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
            />
          </div>
          <div className="dateWrapper">
            <label htmlFor="checkOutDate" className="dateLabel">Check-out Date:</label>
            <input
              id="checkOutDate"
              type="date"
              className="dateInput"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="totalPrice">
        <strong>Total Price: Rp. {totalPrice}</strong>
      </div>
      <button
        onClick={handleClick}
        className={selectedRooms.length > 0 ? "rButton" : "rButton active"}
        disabled={selectedRooms.length === 0 || !checkInDate || !checkOutDate}
      >
        Reserve Now!
      </button>
    </div>
  ) : (
    <div className="feedback">
      <div className="d-flex justify-content-center">
        <img src={success} width="57" height="57" alt="Success" />
      </div>
      <p>Reservation booked successfully</p>
      {selectedRooms.map((room, index) => (
        <p key={index} className="id">
          <span className="book">Booking ID</span>: <span>{room.booking_id}</span>
          <i
            onClick={() => {
              try {
                navigator.clipboard.writeText(room.booking_id);
                setCopy(true);
                setTimeout(() => setCopy(false), 1000);
              } catch (err) {
                console.error("Clipboard copy failed:", err);
              }
            }}
            className="bx ms-2 bx-copy tooltips"
          >
            {copy && <span className="tooltiptext">Copied</span>}
          </i>
        </p>
      ))}
      <div className="button-cont d-flex justify-content-center">
        <button onClick={() => navigate("/hotels")} className="btn explore btn-md me-2 btn-primary">Explore</button>
        <button onClick={() => navigate("/")} className="btn home btn-md btn-primary">Home page</button>
      </div>
    </div>
  )}
</div>

    </div>
  );
};

export default Reserve;
