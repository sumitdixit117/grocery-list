import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import CreateItemModal from "./CreateItemModal";

const NavbarComponent = ({ theme, setTheme, setItems }) => {

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Navbar bg={theme === "light" ? "light" : "dark"} variant={theme}>
      <Container className="py-2">
        <Navbar.Brand href="/" style={{ fontSize: "20px", fontWeight: "500" }}>
          GroceryItems
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Button
            variant="outline-secondary"
            onClick={toggleTheme}
            className="me-3 d-flex align-items-center"
          >
            {theme === "light" ? <IoMoon /> : <LuSun />}
          </Button>
          <CreateItemModal theme={theme} setItems={setItems} />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
