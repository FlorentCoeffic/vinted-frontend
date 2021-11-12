import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      console.log(response.data);

      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
      if (error.response.status === 409) {
        setErrorMessage("Cet email est déjà utilisé");
      }
    }
  };

  return (
    <div>
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
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

        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
          type="password"
          placeholder="Mot de passe"
        />

        <div>
          <input type="checkbox" />
          S'inscrire à notre newsletter
        </div>

        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <span className="errorMessage"> {errorMessage}</span>
        <button>S'inscrire</button>

        <Link to="/login ">
          <span> Tu as déjà un compte ? Connecte-toi!</span>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
