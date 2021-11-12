import logo from "../asset/img/logo.png";
import { Link, useNavigate } from "react-router-dom";

// {
//   token ? <button>deco</button> : "les deux link co s'incrire";
// }

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
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <div>
            <Link to="/signup ">S'inscrire</Link>
            <Link to="/login ">
              <button>Se connecter</button>
            </Link>
          </div>
        )}
      </div>

      <button> Vends tes articles</button>
    </div>
  );
};

export default Header;
