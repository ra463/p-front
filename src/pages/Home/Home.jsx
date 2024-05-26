import React from "react";
import "./Home.scss";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <section className="home_section">
        <div className="intro">
          <h1 className="home_head">Find Your Perfect Home At Rentify In One Click</h1>
          <p>
            Rentify is an online platform that allows you to find your perfect
            home at a very reasonable price. You can search for properties in
            your desired location.
          </p>
          <div className="btns">
            <button>Get Started</button>
            <button onClick={() => navigate("/all-properties")}>Listed Properties</button>
          </div>
        </div>
        <div className="home_pic">
          <img src="/house-nobg.png" alt="logo" />
        </div>
      </section>
      <section className="about_us">
        <h1>About Us</h1>
        <p>
          "Rentify" revolutionizes the way people find their ideal homes and
          landlords manage their properties through a seamless online platform.
          Whether you're a homeowner looking to rent out your space or a tenant
          in search of the perfect place to call home, Rentify provides the
          ultimate solution.<br></br><br></br>
          For property owners, Rentify offers a hassle-free registration process
          to list their properties. From cozy apartments to spacious houses,
          landlords can showcase their spaces with vivid descriptions,
          high-quality images, and precise location details. The platform also
          provides tools for landlords to manage inquiries, schedule viewings,
          and screen potential tenants, ensuring a smooth and secure rental
          process.<br></br><br></br>
          On the other hand, for prospective tenants, Rentify simplifies the
          search for the ideal home. With an extensive database of listings
          spanning various locations, sizes, and amenities, finding the perfect
          rental has never been easier. Users can filter their searches based on
          preferences such as budget, location, number of bedrooms, and more.
          Plus, Rentify offers features like virtual tours and neighborhood
          insights to help tenants make informed decisions.<br></br><br></br>
          Rentify prioritizes transparency and trust, providing secure payment
          options and comprehensive rental agreements to protect both landlords
          and tenants. The platform fosters communication between parties,
          facilitating negotiations and resolving any issues that may arise
          during the rental period. Whether you're a homeowner eager to maximize
          your property's potential or a tenant seeking a comfortable and
          convenient living space, Rentify is your go-to destination for all
          things rental. With its user-friendly interface, robust features, and
          commitment to customer satisfaction, Rentify truly redefines the
          rental experience in the digital age.
        </p>
      </section>
    </>
  );
};

export default Home;
