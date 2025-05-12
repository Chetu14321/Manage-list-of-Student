import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate("/list");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right,rgb(236, 241, 203),rgb(244, 252, 171))",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="name" >
        Student Management System
      </div>
      <div className="card shadow-lg" style={{ minWidth: "350px", maxWidth: "450px", width: "100%", backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
        {/* <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">Student Management System</h4>
        </div> */}
        <div className="card-body">
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer text-center">
          <small className="text-muted">
            Forgot your password? Contact the admin.
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
