import logo from "../asset/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ setUser, token, setSearchResult }) => {
  const navigate = useNavigate();

  const handleChange = (event) => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${event.target.value}`
        );
        setSearchResult(response.data);
        // setData(response.data);
        // setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>

      <input
        onChange={handleChange}
        type="text"
        placeholder="Recherche des articles"
      />

      <div className="connexion">
        {token ? (
          <button
            className="deconnexion"
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <div>
            <Link className="signup" to="/signup ">
              S'inscrire
            </Link>
            <Link className="login" to="/login ">
              Se connecter
            </Link>
          </div>
        )}
      </div>

      <button className="sellButton"> Vends tes articles</button>
    </div>
  );
};

export default Header;
