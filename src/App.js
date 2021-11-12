import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "./App.css";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Offers from "./pages/Offers";

function App() {
  const [token, setToken] = useState(null);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };
  return (
    <Router>
      <Header setUser={setUser} token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/offers" element={<Offers />} />
      </Routes>
    </Router>
  );
}

export default App;
