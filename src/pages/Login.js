import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = ({ setUser, baseUrl }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/user/login`, {
        email: email,
        password: password,
      });

      if (response.data.token) {
        setUser(response.data.token);
        // history.push(location.state.fromPublish ? "/publish" : "/");
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
      if (error.response.status === 401) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      }
    }
  };

  return (
    <div className="container-login">
      <h2> Se connecter</h2>

      <form onSubmit={handleSubmit}>
        <div className="formLogin">
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            type="password"
            placeholder="Mot de passe"
          />

          <span className="errorMessage">{errorMessage}</span>
        </div>

        <input
          className="login-button"
          type="submit"
          value="Se connecter"
        ></input>
      </form>

      <Link className=" signup-link" to="/signup ">
        <span> Pas encore de compte ? Inscrit-toi!</span>
      </Link>
    </div>
  );
};

export default Login;
