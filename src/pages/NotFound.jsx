import React from "react";
import "./NotFound.scss";
import Header from "../components/Header/Header";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="not_found">
        <h2>Requested Page Not Found</h2>
      </div>
    </>
  );
};

export default NotFound;
