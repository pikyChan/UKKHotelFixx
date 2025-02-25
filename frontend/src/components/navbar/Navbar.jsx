import "./navbar.scss";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [navbar, setNavbar] = useState(false);

  const notify = () => {
    toast.success("Logged out");
  };

  const changeBackground = () => {
    setNavbar(window.scrollY >= 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  const handleLogout = () => {
    notify();
    setTimeout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // Perbaikan: Hapus user dari localStorage
      window.location.reload();
    }, 800);
  };

  return (
    <nav className={`navbar fixed-top navbar-expand-lg ${navbar ? "active" : ""}`}>
      <ToastContainer autoClose={800} />

      <div className="container">
        <Link className="navbar-brand" to="/">
          Resérve
        </Link>
        <button
          className="navbar-toggler d-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01"></div>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {user ? (
            <li className="nav-item me-3" onClick={handleLogout}>
              <a href="##" className="nav-link btn px-2 btn-md d-flex align-items-center" style={{fontSize:"13px"}}>
                <i className="bx bx-power-off me-1"></i> {user.username}
              </a>
            </li>
          ) : (
            <li className="nav-item me-3">
              <Link className="nav-link btn px-2 btn-md login-btn" to="/login">
                Login <i className="bx bx-log-in-circle"></i>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
