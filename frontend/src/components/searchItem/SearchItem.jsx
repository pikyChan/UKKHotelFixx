import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "./searchItem.scss";

const SearchItem = ({ item }) => {

  return (
    <div className="col-md-12 col-sm-6">
      <div
        className="searchItem"
      >
        <img src={`http://localhost:3000/api/uploads/${item.photos}`}  alt="" className="siImg" />

        <div className="mobileDesc">
          <h4 className="mt-3">{item.name}</h4>
          {item.rating && (
            <Rating
              name="half-rating-read"
              defaultValue={item.rating}
              precision={0.5}
              readOnly
            />
          )}

          <div className="mobileDescFooter">
            <div className="left">
              <h5>Rp. {item.cheapest_price}</h5>
              <h6>Per night</h6>
            </div>
            <div className="right">
              <Link to={`/hotels/${item.id}`}>
                <button>Book Now</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="siDesc">
          <h1 className="siTitle">{item.name}</h1>
          <span className="siDistance">{item.distance}m from center</span>
          <span className="siTaxiOp">Free airport taxi</span>
          <span className="siSubtitle">
            Studio Apartment with Air conditioning
          </span>
          <span className="siCancelOp">Free cancellation </span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails">
          {item.rating && (
            <div className="rating-cont d-flex justify-content-end">
              <Rating
                name="half-rating-read"
                defaultValue={item.rating}
                precision={0.5}
                readOnly
              />
            </div>
          )}
          <div className="siDetailTexts">
            <span className="siPrice">Rp{item.cheapest_price}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <Link to={`/hotels/${item.id}`}>
              <button className="siCheckButton">See availability</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
