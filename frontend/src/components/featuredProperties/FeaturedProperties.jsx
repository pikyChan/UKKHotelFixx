import { useState, useEffect } from "react";
import "./featuredProperties.scss";
import FeaturedItem from "./FeaturedItem";

const FeaturedProperties = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hotels/featured");
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <div className="res container">
      <h1 className="homeTitle mb-4">Top Hotels</h1>

      <div className="fp row gy-4">
        {loading ? (
          <div className="lds-roller mx-auto">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : data.length === 0 ? (
          <p className="text-center">Tidak ada properti unggulan yang tersedia.</p>
        ) : (
          data.map((item) => (
            <div key={item.id} className="col-md-6 col-lg-3">
              <FeaturedItem item={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedProperties;
