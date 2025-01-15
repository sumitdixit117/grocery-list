import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import NavbarComponent from "./components/Navbar";
import ItemGrid from "./components/ItemGrid";

export const BASE_URL = "http://127.0.0.1:5000/api";

function App() {
  const [items, setItems] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  return (
    <div>
      <NavbarComponent theme={theme} setTheme={setTheme} setItems={setItems} />

      <Container
        className={`p-3 my-4 bg-${theme} rounded text-${
          theme === "light" ? "dark" : "light"
        }`}
      >
        <div className="text-center mb-4">
          <h1 className="display-5">GROCERY LIST</h1>
        </div>

        <ItemGrid theme={theme} items={items} setItems={setItems} />
      </Container>
    </div>
  );
}

export default App;
