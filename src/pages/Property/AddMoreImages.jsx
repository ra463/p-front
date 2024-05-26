import React, { useState } from "react";
import { Modal, Form, Button, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosUtil";
import { useParams } from "react-router-dom";
import { getProperty } from "../../features/apiCall";

export default function AddMoreImages(props) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [addImgLoading, setAddImgLoading] = useState(false);
  const [images, setImages] = useState([]);

  const { id } = useParams();

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleAddMoreImages = async (e) => {
    e.preventDefault();
    try {
      setAddImgLoading(true);

      const formData = new FormData();
      images.forEach((image) => {
        formData.append("files", image);
      });
      const { data } = await axiosInstance.post(
        `/api/property/add-more-images/${id}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setAddImgLoading(false);
      alert(data.message);
      getProperty(dispatch, token, id);
      props.onHide();
      setImages([]);
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
          Add More Images
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleAddMoreImages}>
        <Modal.Body>
          <Container>
            <Form.Group className="mb-3">
              <Form.Label>Add More Images</Form.Label>
              <Form.Control
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImages}
              />
            </Form.Group>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            {addImgLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Add"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
