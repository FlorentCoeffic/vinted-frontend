import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = ({ setUser, baseUrl }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`${baseUrl}/user/signup`, {
        username: username,
        email: email,
        password: password,
      });
      console.log(response.data);

      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.message);
      if (error.response.status === 409) {
        setErrorMessage("Cet email est déjà utilisé");
      }
    }
  };

  return (
    <div>
      <div className="containerSignup">
        <h2>S'inscrire</h2>
        <form className="formSignup" onSubmit={handleSubmit}>
          <input
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            value={username}
            type="text"
            placeholder="Nom d'utilisateur"
          />
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            type="email"
            placeholder="Email"
          />
          <span className="errorMessage"> {errorMessage}</span>
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
            type="password"
            placeholder="Mot de passe"
          />

          <div className="form-checkbox">
            <input className="checkbox" type="checkbox" />
            S'inscrire à notre newsletter
          </div>

          <p className="signup-alert">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>

          <button className="signup-button">S'inscrire</button>
        </form>
        <Link className="login-link" to="/login ">
          <span>Tu as déjà un compte ? Connecte-toi!</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
