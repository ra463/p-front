/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Property.scss";
import Header from "../../components/Header/Header";
import {
  MdBedroomParent,
  MdDelete,
  MdLocationOn,
  MdOutlineCompareArrows,
} from "react-icons/md";
import { BsPinFill } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { IoMdHeart, IoIosHeartEmpty } from "react-icons/io";
import { Carousel, Spinner } from "react-bootstrap";
import UpdateDetails from "./UpdateDetails";
import { useNavigate, useParams } from "react-router-dom";
import { getProperty } from "../../features/apiCall";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosUtil";
import AddMoreImages from "./AddMoreImages";

const Property = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, id: userId } = useSelector((state) => state.auth);
  const { property } = useSelector((state) => state.property);

  let user = token ? true : false;

  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [seller_data, setSeller_data] = useState();
  const [loading, setLoading] = useState(false);
  const [deleteImgLoading, setDeleteImgLoading] = useState(false);

  const { id } = useParams();

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    if (token) {
      getProperty(dispatch, token, id);
    }
  }, [id]);

  const handleLikeUnlike = async () => {
    try {
      const { data } = await axiosInstance.patch(
        `/api/property/like-unlike-property/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      alert(data.message);
      getProperty(dispatch, token, id);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const deleteProperty = async () => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (!confirm) return;
      setLoading(true);
      const { data } = await axiosInstance.delete(
        `/api/property/delete-property/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      alert(data.message);
      navigate("/my-properties");
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleDeleteImage = async (public_id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this image?"
      );
      if (!confirm) return;
      setDeleteImgLoading(true);
      const { data } = await axiosInstance.patch(
        `/api/property/delete-image/${id}`,
        { public_id },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setDeleteImgLoading(false);
      alert(data.message);
      getProperty(dispatch, token, id);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleSendData = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        `/api/property/send-details/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setSeller_data(data.data);
        alert(data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <h1 className="heading">Property Details</h1>
      <div className="details">
        <h2>{property?.title}</h2>
        <div className="head">
          <span>
            <MdLocationOn /> {property?.address}, {property?.city},{" "}
            {property?.state}
          </span>
          <span onClick={handleLikeUnlike}>
            {property?.likes && property?.likes.includes(userId) ? (
              <IoMdHeart className="heart" />
            ) : (
              <IoIosHeartEmpty className="heart" />
            )}{" "}
            Like ({property?.likes?.length})
          </span>
        </div>
        <div className="grid">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {property?.images &&
              property?.images.map((image, i) => (
                <Carousel.Item key={i}>
                  <img
                    className="d-block w-100 carousel_img"
                    src={image?.url}
                    alt={`${i} Slide`}
                  />
                  <Carousel.Caption>
                    {user && property?.seller === userId && (
                      <div
                        className="delete"
                        onClick={() => handleDeleteImage(image?.public_id)}
                      >
                        {deleteImgLoading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <MdDelete />
                        )}
                      </div>
                    )}
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>
          <div className="right">
            <div className="features">
              <span>
                <BsPinFill /> {property?.pincode}
              </span>
              <span>₹ {property?.price}/Month</span>
              <span>
                <FaWarehouse /> {property?.totalRooms} (Rooms)
              </span>
              <span>
                <MdBedroomParent /> {property?.noOfBedrooms} (BedRooms)
              </span>
              <span>
                <MdOutlineCompareArrows /> {property?.area} sqft (Area)
              </span>
            </div>
            <div className="overview">
              <h3>Property Overview/Discription</h3>
              <p>{property?.description}</p>
            </div>
            {user && property.seller !== userId && (
              <button onClick={handleSendData} className="interest">
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "I am Interest"
                )}
              </button>
            )}
            {seller_data && (
              <div className="overview">
                <h5>Seller Details:</h5>
                <p>Name : {seller_data.name}</p>
                <p>Email : {seller_data.email}</p>
                <p>Phone : {seller_data.mobile}</p>
              </div>
            )}
            {user && property.seller === userId && (
              <button onClick={() => setOpen(true)} className="update">
                Update Details
              </button>
            )}
            {user && property.seller === userId && (
              <button onClick={() => setModal(true)} className="add">
                Add More Images
              </button>
            )}
            {user && property.seller === userId && (
              <button onClick={deleteProperty} className="delete">
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Delete Property"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      <UpdateDetails show={open} onHide={() => setOpen(false)} />
      <AddMoreImages show={modal} onHide={() => setModal(false)} />
    </>
  );
};

export default Property;
