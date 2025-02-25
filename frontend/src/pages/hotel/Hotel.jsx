import "./hotel.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Hotel = () => {
  const labels = {
    1: "Useless+",
    2: "Poor+",
    3: "Good",
    4: "Impressive",
    5: "Excellent+",
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const location = useLocation();
  const pathParts = location.pathname.split("/");

  // ✅ Extract hotel_id dan room_id dari URL
  const hotel_id = pathParts[2];
  const room_id = pathParts[4];
  const room_number=  pathParts[6];

  console.log("Hotel ID:", hotel_id);
  console.log("Room ID:", room_id);
  console.log("room number:", room_number);

  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [roomData, setRoomData] = useState(null); // ✅ State untuk data kamar
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);

  // ✅ Fetch hotel data
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/hotels/${hotel_id}`);
        const result = await res.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        setLoading(false);
      }
    };

    if (hotel_id) {
      fetchHotelData();
    }
  }, [hotel_id]);

  // ✅ Fetch room data jika `room_id` ada
  useEffect(() => {
    if (room_id, room_number) {
      const fetchRoomData = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/roomnumbers/type/${room_id}`);
          const result = await res.json();
          setRoomData(result);
        } catch (error) {
          console.error("Error fetching room data:", error);
        }
      };
      fetchRoomData();
    }
  }, [room_id], [room_number]);

  // ✅ Konversi foto untuk ImageGallery
  const images = data.photos
    ? data.photos.split(",").map((photo) => ({
        original: `http://localhost:3000/api/uploads/${photo.trim()}`,
        thumbnail: `http://localhost:3000/api/uploads/${photo.trim()}`,
      }))
    : [];

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const notify = () => {
    toast.warning("Not authenticated, Redirecting to login page");
  };

  const delay = () => {
    navigate("/login");
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      notify();
      setTimeout(delay, 1500);
    }
  };

  return (
    <div>
      <ToastContainer autoClose={3000} />
      <Header type="list" />

      <div className="hotelContainer container">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="lds-spinner">
              <div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div>
            </div>
          </div>
        ) : (
          <div className="hotelWrapper">
            <div className="d-md-flex d-block justify-content-md-between">
              <div>
                <h1 className="hotelTitle">{data.name}</h1>
                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{data.address}</span>
                </div>
                <div className="hotelDistance">
                  Excellent location – {data.distance}m from center
                </div>
                <div className="hotelPriceHighlight">
                  Book a stay over Rp. {data.cheapest_price} at this property and get a free airport taxi
                </div>
              </div>

              <div>
                <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
                  <Rating
                    name="hover-feedback"
                    value={data.rating}
                    precision={0.5}
                    getLabelText={getLabelText}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    readOnly
                  />
                  {data.rating !== null && (
                    <Box sx={{ ml: 2 }}>{labels[data.rating]}</Box>
                  )}
                </Box>
              </div>
            </div>

            <div className="row mt-0 gy-5">
              <div className="col-lg-8">
                {images.length > 0 ? (
                  <ImageGallery items={images} />
                ) : (
                  <p>No images available</p>
                )}
              </div>

              <div className="col-lg-4">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.name}</h1>
                  <p className="hotelDesc">{data.description}</p>
                </div>

                <div className="hotelDetails mt-5">
                  <div className="hotelDetailsPrice">
                    <h1>Perfect for a {days}-night stay!</h1>
                    <span>
                      Located in the real heart of {data.city}, this property
                      has an excellent location score of {data.rating}
                    </span>
                    <h2>
                      <b>Rp. {days * data.cheapest_price * options.room}</b> ({days}{" "}
                      nights)
                    </h2>
                    <button onClick={handleClick}>Reserve or Book Now!</button>
                  </div>
                </div>
                <p className="hotelInfo">
                  Rooms reservation are 2 night by defualt, you can change it
                  when you explore or search
                </p>

              </div>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Reserve modal */}
      {openModal && <Reserve setOpen={setOpenModal} hotel_id={hotel_id} room_number={room_number} room_id={room_id} user_id={user?.id} />}

      <Footer />
    </div>
  );
};

export default Hotel;
