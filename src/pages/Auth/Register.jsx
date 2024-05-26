import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axiosUtil";
import { setToken } from "../../features/authSlice";
import { Spinner } from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/api/user/register", {
        firstName,
        lastName,
        email,
        password,
        mobile,
        confirmPassword,
        role,
      });

      if (data.success) {
        setLoading(false);
        localStorage.setItem("token", data.token);
        localStorage.setItem("firstName", data.user.firstName);
        localStorage.setItem("lastName", data.user.lastName);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("mobile", data.user.mobile);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("id", data.user._id);

        dispatch(
          setToken({
            token: data.token,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            mobile: data.user.mobile,
            role: data.user.role,
            id: data.user._id,
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
        <h1>SIGN UP</h1>
        <span>
          Welcome to Rentify! Register yourself either as a seller or buyer.
        </span>

        <form onSubmit={handleSubmit} className="auth_form">
          <div className="form_subgrp">
            <div className="form_grp">
              <label>Fisrt Name</label>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                type="text"
              />
            </div>
            <div className="form_grp">
              <label>Last Name</label>
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                type="text"
              />
            </div>
          </div>
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
          <div className="form_subgrp">
            <div className="form_grp">
              <label>Mobile Number</label>
              <input
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="1234567890"
                type="number"
              />
            </div>
            <div className="form_grp">
              <label>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option>Select Role</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
          </div>
          <div className="form_grp">
            <label>Password</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              type="text"
            />
          </div>
          <div className="form_grp">
            <label>Confirm Password</label>
            <input
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              type="password"
            />
          </div>
          <button type="submit" className="btn">
            {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
          </button>
          <div className="links">
            <Link to="/login">Go back to login?</Link>
          </div>
        </form>
      </div>
      <div className="picture">
        <img src="/house.png" alt="login" />
      </div>
    </div>
  );
};

export default Register;
