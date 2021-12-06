import logo from "../asset/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { Range } from "react-range";

const Header = ({
  setUser,
  token,
  setSearchResult,
  baseUrl,
  setFetchRangeValues,
  sortPrice,
  setSortPrice,
}) => {
  const navigate = useNavigate();

  const handleChange = (event) => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/offers?title=${event.target.value}`
        );
        setSearchResult(response.data);
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
      <div>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Recherche des articles"
        />
        <span style={{ marginRight: 10 }}>Trier par prix : </span>
        <span className="checkbox">
          <input type="checkbox" checked={sortPrice} name="price" />
          <div
            className="wrapper"
            onClick={() => {
              setSortPrice(!sortPrice);
            }}
          >
            <div className="knob">
              <span>{sortPrice ? "⇣" : "⇡"}</span>
            </div>
          </div>
        </span>
      </div>

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

      <button
        onClick={() => {
          navigate("/publish");
        }}
        className="header-button sellButton"
      >
        Vends tes articles
      </button>
    </div>
  );
};

export default Header;
