import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { set } from "js-cookie";

const Home = ({ searchResult }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  console.log("home", searchResult);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );

        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setData(searchResult);
  }, [searchResult]);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div>
      <Hero />
      <div className="offers">
        {data.offers.map((offer, index) => {
          return (
            <Link className="offer" key={offer._id} to={`/offer/${offer._id}`}>
              <span>{offer.owner.account.username}</span>
              <img
                className="img"
                src={offer.product_image.secure_url}
                alt={offer.product_name}
              />
              <span>{offer.product_price} €</span>
              {offer.product_details.map((detail, index) => {
                return <div>{detail.TAILLE && detail.TAILLE}</div>;
              })}

              {offer.product_details.map((detail, index) => {
                return <div>{detail.MARQUE && detail.MARQUE}</div>;
              })}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
