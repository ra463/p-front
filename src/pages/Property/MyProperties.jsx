/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./MyProperties.scss";
import {
  MdLocationOn,
  MdBedroomParent,
  MdOutlineCompareArrows,
} from "react-icons/md";
import { FaWarehouse } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellerProperties } from "../../features/apiCall";
import { Spinner } from "react-bootstrap";

const MyProperties = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, role } = useSelector((state) => state.auth);
  const { sellerProperties } = useSelector((state) => state.property);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (role !== "seller") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (token) {
      getAllSellerProperties(setLoading, dispatch, token);
    }
  }, [token]);

  return (
    <>
      <Header />
      <h1 className="my_properties_heading">My Properties</h1>
      <div className="my_properties">
        {sellerProperties && sellerProperties.length > 0 ? (
          sellerProperties.map((property, i) => (
            <div key={i} className="my_property">
              <div className="left">
                <img src={property.images[0].url} alt="property" />
                <div className="property_details">
                  <h5>{property?.title}</h5>
                  <span className="location">
                    <MdLocationOn />{" "}
                    {`${property?.city}, ${property?.state}, ${property?.pincode}`}
                  </span>
                  <div className="property_features">
                    <span>
                      <FaWarehouse /> {property?.totalRooms} (Rooms)
                    </span>
                    <span>
                      <MdBedroomParent /> {property?.noOfBedrooms} (BedRooms)
                    </span>
                    <span>
                      <MdOutlineCompareArrows /> {property?.area} (Sqft)
                    </span>
                  </div>
                </div>
              </div>
              <div className="right">
                <button onClick={() => navigate(`/property/${property?._id}`)}>
                  View Details
                </button>
                <button onClick={() => navigate(`/property/${property?._id}`)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : loading ? (
          <Spinner style={{ marginTop: "10rem" }} animation="border" />
        ) : (
          <h4>No properties found</h4>
        )}
      </div>
    </>
  );
};

export default MyProperties;
