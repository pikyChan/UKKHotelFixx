import "./header.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const Header = ({ type }) => {
  const [city, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/hotels", { state: { city } });
  };

  return (
    <div className={type === "list" ? "header listMode" : "header"}>
      <div className="headerContainer container">
        <Navbar />
        <div className="headerCont">
          <div>
            {type === "list" && (


<div className="h2" style={{ display: "flex", justifyContent: "center", alignItems: "center",marginLeft:"35%", height: "100%" }}>
<h2 className="text-center" style={{ fontSize: "40px" }}>
  Fresh, quite and peaceful
</h2>
</div>

              
            )}
            {type !== "list" && (
              <>
                <div className="row headerWrapper">
                  <div className="col-md-8 col-10">
                    <h1 className="headerTitle">Fresh, quite and peaceful</h1>
                    <p className="headerDesc">
                      Get rewarded for your travels – unlock instant savings of
                      10% or more with a free booking account
                    </p>
                    <div className="col-md-12 button-cont">
                      <button
                        className="headerBtn"
                        onClick={() => navigate("/hotels", { state: { city } })}
                      >
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
                <div className="headerSearch">
                  <div className="headerSearchItem">
                    <i className="bx bx-location-plus headerIcon"></i>
                    <input
                      type="text"
                      placeholder="Location"
                      className="headerSearchInput"
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                  <div className="headerSearchButton">
                    <button
                      className={city === "" ? "headerBtn2 active" : "headerBtn2"}
                      onClick={handleSearch}
                      disabled={city === ""}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
