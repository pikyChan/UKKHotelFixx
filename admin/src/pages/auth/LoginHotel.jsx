import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));

    try {
      const response = await fetch("http://localhost:3000/api/loginhotel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.is_admin === "adminhotel") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("hotelId", data.hotel_id);
        localStorage.setItem("isLoggedIn", "true");
        event.target.reset();
        window.location.href = "/adminhotel/dashboardhotel";
      } else {
        alert("Hanya admin yang dapat login!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <a href="#" className="h1"><b>Admin</b></a>
        </div>
        <div className="card-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input type="email" name="email" className="form-control" placeholder="Email" required />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input type="password" name="password" className="form-control" placeholder="Password" required />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <div className="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
              </div>
            </div>
            <p className="mt-3">
                        Already have an account? <Link to="/registerhotel">Sign Up</Link>
                      </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
