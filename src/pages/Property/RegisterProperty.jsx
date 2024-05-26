import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./RegisterProperty.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import axiosInstance from "../../utils/axiosUtil";

const RegisterProperty = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [price, setPrice] = useState("");
  const [totalRooms, setTotalRooms] = useState("");
  const [totalArea, setTotalArea] = useState("");
  const [noOfBedrooms, setNoOfBedrooms] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("pincode", pincode);
      formData.append("price", price);
      formData.append("totalRooms", totalRooms);
      formData.append("noOfBedrooms", noOfBedrooms);
      formData.append("area", totalArea);
      formData.append("description", description);
      images.forEach((image) => {
        formData.append("files", image);
      });

      setLoading(true);
      const { data } = await axiosInstance.post(
        "/api/property/register-property",
        formData,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        setLoading(false);
        alert("Property Added Successfully");
        navigate("/my-properties");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <h1 className="heading">Register Your Property</h1>
      <div className="register_property">
        <form onSubmit={handleSubmit}>
          <div className="form_grp">
            <label>Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
              type="text"
            />
          </div>
          <div className="form_grp">
            <label>Address</label>
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
              type="text"
            />
          </div>

          <div className="form_subgrp">
            <div className="form_grp">
              <label>City</label>
              <input
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter City"
                type="text"
              />
            </div>
            <div className="form_grp">
              <label>State</label>
              <input
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter State"
                type="text"
              />
            </div>
          </div>
          <div className="form_subgrp">
            <div className="form_grp">
              <label>Pincode</label>
              <input
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Pincode"
                type="number"
              />
            </div>
            <div className="form_grp">
              <label>Price</label>
              <input
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price (per month)"
                type="number"
              />
            </div>
          </div>
          <div className="form_subgrp">
            <div className="form_grp">
              <label>Total No. of Rooms</label>
              <input
                required
                value={totalRooms}
                onChange={(e) => setTotalRooms(e.target.value)}
                placeholder="Enter No. of Rooms"
                type="number"
              />
            </div>
            <div className="form_grp">
              <label>Total No. of Bed Rooms</label>
              <input
                required
                value={noOfBedrooms}
                onChange={(e) => setNoOfBedrooms(e.target.value)}
                placeholder="Enter No. of Bed Rooms"
                type="number"
              />
            </div>
          </div>
          <div className="form_grp">
            <input
              required
              placeholder="Total Area in sqft"
              type="number"
              value={totalArea}
              onChange={(e) => setTotalArea(e.target.value)}
            />
          </div>
          <div className="form_grp">
            <input
              required
              placeholder="Upload Images"
              accept="image/*"
              type="file"
              multiple
              onChange={handleImages}
            />
          </div>

          <div className="form_grp">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter the other more details like the no.of bathrooms, nearby places, hospitals, schools, shopping etc."
              type="text"
              rows="5"
            />
          </div>
          <button type="submit" className="submit_btn" disabled={loading}>
            {loading ? <Spinner size="sm" /> : "Register Property"}
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterProperty;
