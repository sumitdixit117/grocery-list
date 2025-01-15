import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import ItemCard from "./ItemCard";
import { BASE_URL } from "../App";

const ItemGrid = ({ theme, items, setItems }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch(BASE_URL + "/items");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getItems();
  }, [setItems]);

  return (
    <Container
      className={`p-5 ${
        theme === "dark" ? "bg-dark" : "bg-light"
      }`}
    >
      {isLoading && (
        <Row className="justify-content-md-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      )}
      {!isLoading && items.length === 0 && (
        <Row className="justify-content-md-center">
          <Alert
            variant={theme === "dark" ? "dark" : "warning"}
            className="w-50 text-center"
          >
            <Alert.Heading>No items found.</Alert.Heading>
          </Alert>
        </Row>
      )}
      <Row>
        {items.map((item) => (
          <Col key={item.id} xs={12} md={6} lg={4} className="mb-4">
            <ItemCard theme={theme} item={item} setItems={setItems} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemGrid;
