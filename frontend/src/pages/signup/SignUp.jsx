import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const notifySuccess = () => toast.success("Account created successfully! Redirecting...");
  const notifyError = (message) => toast.error(message);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error("Registration failed. Try again.");

      notifySuccess();
      setTimeout(() => navigate("/login"), 2000);
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
                    alt="Sign Up"
                    className="img-fluid img-mdb"
                  />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <h1 className="fw-bold mb-3">Reserva</h1>
                      <h5 className="fw-normal mb-3 pb-3">Create an account</h5>

                      <div className="mb-3">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="username"
                          className="form-control form-control-lg"
                          value={userData.username}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          value={userData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          value={userData.password}
                          onChange={handleChange}
                          placeholder="Create a password"
                          required
                        />
                      </div>

                      <button
                        className="btn btn-dark btn-lg btn-block"
                        disabled={loading}
                        onClick={handleSignUp}
                      >
                        {loading ? "Registering..." : "Sign Up"}
                      </button>

                      <p className="mt-3">
                        Already have an account? <Link to="/login">Login</Link>
                      </p>
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

export default SignUp;
