import "./list.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useState, useEffect } from "react";
import SearchItem from "../../components/searchItem/SearchItem";

const List = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/hotels");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div>
      <Header type="list" />
      <div className="listContainer container">
        <h3 className="mb-2">List of Hotels</h3>
        <div className="listWrapper row gy-5">
          <div className="col-md-12">
            <div className="listResult">
              {loading ? (
                <div className="d-flex justify-content-center mt-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="row gy-4">
                  {data.length === 0 ? (
                    <p className="text-center">No hotels available.</p>
                  ) : (
                    data.map((hotel) => <SearchItem item={hotel} key={hotel.id} />)
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
