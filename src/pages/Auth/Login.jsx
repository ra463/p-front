import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axiosUtil";
import "./Login.scss";
import { setToken } from "../../features/authSlice";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });

      if (data?.success) {
        setLoading(false);
        localStorage.setItem("token", data?.token);
        localStorage.setItem("firstName", data?.user.firstName);
        localStorage.setItem("lastName", data?.user.lastName);
        localStorage.setItem("email", data?.user.email);
        localStorage.setItem("mobile", data?.user.mobile);
        localStorage.setItem("role", data?.user.role);
        localStorage.setItem("id", data?.user._id);

        dispatch(
          setToken({
            token: data?.token,
            firstName: data?.user.firstName,
            lastName: data?.user.lastName,
            email: data?.user.email,
            mobile: data?.user.mobile,
            role: data?.user.role,
            id: data?.user._id,
          })
        );
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="login">
      <div className="form">
        <h1>SIGN IN</h1>
        <span>
          Welcome back to Rentify! Instantly get a property to rent at a
          reasonable price or register your property.
        </span>

        <form onSubmit={handleSubmit}>
          <div className="form_grp">
            <label>Email</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gamil.com"
              type="email"
            />
          </div>
          <div className="form_grp">
            <label>Password</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              type="password"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? <Spinner size="sm" /> : "Login"}
          </button>
          <div className="links">
            <Link to="/register">Don't have an account?</Link>
            <Link to="/forgot-password">Forgot your password?</Link>
          </div>
        </form>
      </div>
      <div className="picture">
        <img src="/house.png" alt="login" />
      </div>
    </div>
  );
};

export default Login;
