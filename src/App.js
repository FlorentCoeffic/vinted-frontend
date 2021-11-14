import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "./App.css";

import Home from "./pages/Home.js";
import Offer from "./pages/Offer.js";
import Header from "./components/Header.js";
import SignUp from "./pages/SignUp.js";
import Login from "./pages/Login.js";

function App() {
  const [token, setToken] = useState(null);
  const [searchResult, setSearchResult] = useState();

  console.log(searchResult);

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
      <Header
        setUser={setUser}
        token={token}
        setSearchResult={setSearchResult}
      />
      <Routes>
        <Route path="/" element={<Home searchResult={searchResult} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
