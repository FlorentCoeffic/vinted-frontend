import hero from "../asset/img/hero.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="encart">
        <p>Prêts à faire du tri dans vos placards ?</p>
        <button
          onClick={() => {
            navigate("/publish");
          }}
        >
          Commencer à vendre
        </button>
      </div>
      <img src={hero} alt="hero" className="hero" />
    </div>
  );
};

export default Hero;
