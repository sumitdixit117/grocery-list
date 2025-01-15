import React from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";

const ItemCard = ({ item, setItems, theme }) => {
  const handleDeleteItem = async () => {
    try {
      const res = await fetch(BASE_URL + "/items/" + item.id, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <Card
      className="shadow-sm"
      bg={theme === "light" ? "light" : "secondary"}
      text={theme === "light" ? "dark" : "white"}
    >
      <Card.Header
        className={`${
          theme === "light" ? "bg-primary text-white" : "bg-secondary text-dark"
        }`}
      >
        <Row className="align-items-center">
          <Col>
            <h5>{item.name}</h5>
            <p>{item.company}</p>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <EditModal item={item} setItems={setItems} theme={theme} />
            <Button
              variant="outline-danger bg-white"
              onClick={handleDeleteItem}
              className="ms-2"
              size="sm"
            >
              <BiTrash size={20} />
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          Price: <Badge>₹{item.price}</Badge>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
