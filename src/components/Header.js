import logo from "../asset/img/logo.png";

const Header = () => {
  return (
    <div className="header">
      <img className="logo" src={logo} alt="logo" />
      <input type="text" placeholder="Recherche des articles" />
      <div className="connexion">
        <button>S'inscrire </button>
        <button>Se connecter</button>
      </div>

      <button> Vends tes articles</button>
    </div>
  );
};

export default Header;
