import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "./App.css";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  const [token, setToken] = useState(null);
  const [searchResult, setSearchResult] = useState();

  console.log(searchResult);

  // const baseUrl = "https://florent-vinted-api.herokuapp.com";
  const baseUrl = "http://localhost:4000";
  console.log("Baseurl ====>", baseUrl);

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
        <Route
          path="/"
          element={<Home searchResult={searchResult} baseUrl={baseUrl} />}
        />
        <Route
          path="/signup"
          element={<SignUp setUser={setUser} baseUrl={baseUrl} />}
        />
        <Route
          path="/login"
          element={<Login setUser={setUser} baseUrl={baseUrl} />}
        />
        <Route
          path="/publish"
          element={<Publish token={token} baseUrl={baseUrl} />}
        />
        <Route path="/offer/:id" element={<Offer baseUrl={baseUrl} />} />
        <Route
          path="/payment"
          element={<Payment token={token} baseUrl={baseUrl} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
