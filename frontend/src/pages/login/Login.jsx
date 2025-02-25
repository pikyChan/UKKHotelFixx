import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const notifySuccess = () => toast.success("Logged in successfully");
  const notifyError = (message) => toast.error(message);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/loginuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) throw new Error("Login failed. Please check your credentials.");

      const data = await res.json();
      if (!data || !data.token) throw new Error("Invalid response from server");

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("user_id", data.user_id);

      notifySuccess();
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      notifyError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="vh-100 login-mdb">
      <ToastContainer autoClose={2000} />
      <div className="container py-5 vh-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card card-mbd">
              <div className="row g-0">
                <div className="col-md-6 d-none d-md-block">
                  <img
                    src="https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg"
                    alt="login form"
                    className="img-fluid img-mdb"
                  />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <h1 className="fw-bold mb-3">Reserve</h1>
                      <h5 className="fw-normal mb-3 pb-3">Sign into your account</h5>
                      
                      <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="form-control form-control-lg" 
                          value={credentials.email} onChange={handleChange} placeholder="Enter your email" required />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="form-control form-control-lg"
                          value={credentials.password} onChange={handleChange} placeholder="Enter your password" required />
                      </div>

                      <button className="btn btn-dark btn-lg btn-block" disabled={loading} onClick={handleClick}>
                        {loading ? "Logging in..." : "Login"}
                      </button>
                        <br />
                        <br />
                      <h7 className="mt-3" style={{ color: "#000" }}>
                        Don't have an account? <Link to="/signup" style={{ color: "#0071c2" }}>Sign Up</Link>
                      </h7>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
