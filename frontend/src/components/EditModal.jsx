import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from "../App";

function EditModal({ theme, setItems, item }) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: item.name,
    price: item.price,
    company: item.company,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditItem = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + "/items/" + item.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === item.id ? data : i))
      );
      handleClose();

      setInputs({
        name: "",
        price: "",
        company: "",
      });
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline-success bg-white" onClick={handleShow} size="sm">
        <BiEditAlt size={20} />
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          className={`text-white ${
            theme === "dark" ? "bg-dark" : "bg-primary"
          }`}
        >
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditItem}>
          <Modal.Body className={"text-dark"}>
            <Row>
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={inputs.name}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formCompany">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type="text"
                    value={inputs.company}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formPrice" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={inputs.price}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : "Update"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditModal;
