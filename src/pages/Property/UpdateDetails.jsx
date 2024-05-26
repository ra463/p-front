import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosUtil";
import { useParams } from "react-router-dom";
import { getProperty } from "../../features/apiCall";

export default function UpdateDetails(props) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { property } = useSelector((state) => state.property);

  const { id } = useParams();

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (property) {
      setTitle(property?.title);
      setAddress(property?.address);
      setCity(property?.city);
      setState(property?.state);
      setPincode(property?.pincode);
      setPrice(property?.price);
      setTotalRooms(property?.totalRooms);
      setTotalArea(property?.area);
      setNoOfBedrooms(property?.noOfBedrooms);
      setDescription(property?.description);
    }
  }, [property]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.patch(
        `/api/property/update-property/${property?._id}`,
        {
          title,
          address,
          city,
          state,
          pincode,
          price,
          totalRooms,
          noOfBedrooms,
          area: totalArea,
          description,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setLoading(false);
        alert(data.message);
        props.onHide();
      }
      await getProperty(setLoading, dispatch, token, id);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Property Details
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Container>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter Title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Enter Address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="Enter City"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicState">
              <Form.Label>State</Form.Label>
              <Form.Control
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                type="text"
                placeholder="Enter State"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPin">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                type="number"
                placeholder="Enter Pincode"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price (per/month)</Form.Label>
              <Form.Control
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Enter Price"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRooms">
              <Form.Label>Total Number of Rooms</Form.Label>
              <Form.Control
                required
                value={totalRooms}
                onChange={(e) => setTotalRooms(e.target.value)}
                type="number"
                placeholder="Enter Number of Rooms"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBed">
              <Form.Label>Total Number of Bedrooms</Form.Label>
              <Form.Control
                required
                value={noOfBedrooms}
                onChange={(e) => setNoOfBedrooms(e.target.value)}
                type="number"
                placeholder="Enter Number of Bedrooms"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicArea">
              <Form.Label>Total Area (sqft)</Form.Label>
              <Form.Control
                required
                value={totalArea}
                onChange={(e) => setTotalArea(e.target.value)}
                type="number"
                placeholder="Total Area"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                as="textarea"
                type="text"
                placeholder="Enter Description"
              />
            </Form.Group>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            {loading ? <Spinner animation="border" size="sm" /> : "Update Details"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
