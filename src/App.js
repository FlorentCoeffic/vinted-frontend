import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import { useState, useEffect } from "react";
import logo from "./asset/img/logo.png";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );

        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <Router>
      <div className="header">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <Routes>
        <Route path="/" element={<Home offers={data.offers} />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
