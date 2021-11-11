import { useState, useEffect } from "react";
import axios from "axios";

const SignUp = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup"
        );

        // console.log(response.data);
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <span> Chargement en cours </span>
  ) : (
    <div>
      <h2> S'incrire</h2>

      <input type="text" placeholder="Nom d'utilisateur" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Mot de passe" />
    </div>
  );
};

export default SignUp;
