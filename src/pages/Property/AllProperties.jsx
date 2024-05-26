/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./AllProperties.scss";
import Header from "../../components/Header/Header";
import {
  MdLocationOn,
  MdBedroomParent,
  MdOutlineCompareArrows,
} from "react-icons/md";
import { FaSearch, FaWarehouse } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties } from "../../features/apiCall";
import CustomPagination from "../../utils/CustomPagination";
import { Spinner } from "react-bootstrap";

const AllProperties = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { properties, filteredPropertiesCount } = useSelector(
    (state) => state.property
  );

  const resultPerPage = 10;
  const curPageHandler = (p) => setCurPage(p);

  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [searchQuery_1, setSearchQuery_1] = useState("");
  const [searchQuery_2, setSearchQuery_2] = useState("");
  const [searchQuery_3, setSearchQuery_3] = useState("");
  const [searchInput_3, setSearchInput_3] = useState("");
  const [searchQuery_4, setSearchQuery_4] = useState("");
  const [searchInput_4, setSearchInput_4] = useState("");

  useEffect(() => {
    getAllProperties(
      dispatch,
      setLoading,
      curPage,
      resultPerPage,
      searchQuery_1,
      searchQuery_2,
      searchInput_3,
      searchInput_4
    );
  }, [
    curPage,
    resultPerPage,
    searchQuery_1,
    searchQuery_2,
    searchInput_3,
    searchInput_4,
  ]);

  const numOfPages = Math.ceil(filteredPropertiesCount / resultPerPage);

  return (
    <>
      <Header />
      <div className="all_properties">
        <h1>All Properties</h1>
        <div className="filters">
          <select
            value={searchQuery_1}
            onChange={(e) => {
              setSearchQuery_1(e.target.value);
              setCurPage(1);
            }}
            className="city"
          >
            <option>Select City</option>
            <option value="Jabalpur">Jabalpur</option>
          </select>
          <select
            value={searchQuery_2}
            onChange={(e) => {
              setSearchQuery_2(e.target.value);
              setCurPage(1);
            }}
            className="city"
          >
            <option>Select State</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
          </select>
          <div className="pincode">
            <input
              value={searchQuery_3}
              onChange={(e) => {
                setSearchQuery_3(e.target.value);
                if (e.target.value === "") {
                  setSearchInput_3(e.target.value);
                }
              }}
              type="number"
              placeholder="Pincode"
            />
            <FaSearch
              onClick={() => {
                setSearchInput_3(searchQuery_3);
                setCurPage(1);
              }}
            />
          </div>
          <div className="rooms">
            <input
              value={searchQuery_4}
              onChange={(e) => {
                setSearchQuery_4(e.target.value);
                if (e.target.value === "") {
                  setSearchInput_4(e.target.value);
                }
              }}
              type="number"
              placeholder="No. of rooms"
            />
            <FaSearch
              onClick={() => {
                setSearchInput_4(searchQuery_4);
                setCurPage(1);
              }}
            />
          </div>
        </div>
        <div className="properties">
          {properties && properties.length > 0
            ? properties.map((property, i) => (
                <div
                  key={i}
                  className="property"
                  onClick={() => navigate(`/property/${property._id}`)}
                >
                  <div className="property_img">
                    <img src={property?.images[0].url} alt="property" />
                    <span>₹{property?.price}/Month</span>
                  </div>
                  <div className="property_details">
                    <h3>{property?.title}</h3>
                    <span className="location">
                      <MdLocationOn /> {property?.city}, {property?.state},{" "}
                      {property?.pincode}
                    </span>
                    <div className="property_features">
                      <span>
                        <FaWarehouse /> {property?.totalRooms} (Rooms)
                      </span>
                      <span>
                        <MdBedroomParent /> {property?.noOfBedrooms} (BedRooms)
                      </span>
                      <span>
                        <MdOutlineCompareArrows /> {property?.area} sqft
                      </span>
                    </div>
                  </div>
                </div>
              ))
            : loading ? (
            <Spinner style={{ marginTop: "7rem" }} animation="border" />
          ) : (
            <h4>No properties found</h4>
          )}
        </div>
        <div className="pagination">
          {resultPerPage < filteredPropertiesCount && !loading && (
            <CustomPagination
              pages={numOfPages}
              pageHandler={curPageHandler}
              curPage={curPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AllProperties;
