import React, { useState } from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../features/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, firstName, lastName, email, role } = useSelector(
    (state) => state.auth
  );

  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleModal = () => {
    setModal((prev) => !prev);
  };

  let user = token ? true : false;

  const logout = (e) => {
    e.preventDefault();
    dispatch(removeToken());
    localStorage.clear();
    alert("Logout Successful");
    window.location.reload();
    navigate("/");
  };

  return (
    <header>
      <div className="logo">
        <img src="/r-logo.png" alt="logo" />
        <h2>Rentify</h2>
      </div>
      <div className="home_links">
        <Link to="/">Home</Link>
        <Link to="/all-properties">All Properties</Link>
        {!user ? (
          <Link to="/">About Us</Link>
        ) : user && role === "seller" ? (
          <>
            <Link to="/register-property">Register Property</Link>
            <Link to="/my-properties">My Properties</Link>
          </>
        ) : (
          <Link to="/">About Us</Link>
        )}
      </div>
      <div className="home_btn">
        {user ? (
          <>
            <img onClick={handleModal} src="/user.jpg" alt="user" />
            <div className={`dropdown ${modal ? "dropdown_active" : ""}`}>
              <div className="user_details">
                <span>
                  Hello! {firstName} {lastName}
                </span>
                <span>{email}</span>
                <span>Role : {role}</span>
              </div>
              <button onClick={logout} className="logout">
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="sign-in" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="sign-up" onClick={() => navigate("/register")}>
              Sign Up
            </button>
          </>
        )}
        {open ? (
          <MdClose onClick={handleClick} />
        ) : (
          <RiMenu3Fill onClick={handleClick} />
        )}
      </div>
      <div className={open ? "mobile_links active" : "mobile_links"}>
        <Link to="/">Home</Link>
        <Link to="/all-properties">All Properties</Link>
        {!user ? (
          <Link to="/">About Us</Link>
        ) : user && role === "seller" ? (
          <>
            <Link to="/register-property">Register Property</Link>
            <Link to="/my-properties">My Properties</Link>
          </>
        ) : (
          <Link to="/">About Us</Link>
        )}
        {!user && (
          <>
            <button className="sign-in" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="sign-up" onClick={() => navigate("/register")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
