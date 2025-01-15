import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from "../App";

const CreateItemModal = ({ theme, setItems }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    company: "",
    price: "",
    store: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateItem = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + "/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      handleClose();
      setItems((prevItems) => [...prevItems, data]);

      setInputs({
        name: "",
        price: "",
        company: "",
        store: "",
      });
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={handleShow}
        className="d-flex align-items-center"
      >
        <BiAddToQueue size={20} />
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          className={`text-white ${
            theme === "dark" ? "bg-dark" : "bg-primary"
          }`}
        >
          <Modal.Title>Create a New Item</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateItem}>
          <Modal.Body
            className={'text-dark'}
          >
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
                    required
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
                    required
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
                required
              />
            </Form.Group>
            <Form.Group controlId="formStore" className="mt-3">
              <Form.Label>Store</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Online"
                  value="online"
                  name="store"
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, store: e.target.value }))
                  }
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Offline"
                  value="offline"
                  name="store"
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, store: e.target.value }))
                  }
                />
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : "Add"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreateItemModal;
