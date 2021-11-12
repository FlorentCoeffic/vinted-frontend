import logo from "../asset/img/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ setUser, token }) => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>

      <input type="text" placeholder="Recherche des articles" />

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
