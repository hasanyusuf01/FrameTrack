import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", role: "shop" });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const url = isRegistering ? "http://localhost:8000/api/register/" : "http://localhost:8000/api/login/";
    try {
      const res = await axios.post(url, form);
      localStorage.setItem("token", res.data.token);  // use session if needed
      navigate("/");
    } catch (err) {
      alert("Login/Register failed.");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <h2 className="text-center mb-4">{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input name="username" onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input name="password" type="password" onChange={handleChange} className="form-control" required />
        </div>

        {isRegistering && (
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select name="role" className="form-select" onChange={handleChange}>
              <option value="shop">Shop</option>
              <option value="distributor">Distributor</option>
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          {isRegistering ? "Register" : "Login"}
        </button>
        <button
          type="button"
          className="btn btn-link mt-2"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Already have an account? Login" : "New user? Register"}
        </button>
      </form>
    </div>
  );
}

export default Login;
