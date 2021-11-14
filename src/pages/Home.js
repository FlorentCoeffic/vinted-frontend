import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Hero from "../components/Hero.js";
import { set } from "js-cookie";
import tear from "../asset/img/tear.svg";

const Home = ({ searchResult }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="hero">
        <img src={tear} alt="tear" className="imgDecoration" />
      </div>
      {/* <Hero /> */}
      <div className="offers">
        {data.offers.map((offer, index) => {
          return (
            <Link className="offer" key={offer._id} to={`/offer/${offer._id}`}>
              <div className="userinfo">
                {/* {data.owner.account.avatar && (
                  <img
                    alt={data.product_name}
                    src={data.owner.account.avatar.secure_url}
                  />
                )} */}
                <span>{offer.owner.account.username}</span>
              </div>

              <img
                className="img"
                src={offer.product_image.secure_url}
                alt={offer.product_name}
              />

              <div className="offerinfo">
                <span>{offer.product_price} €</span>
                {offer.product_details.map((detail, index) => {
                  return <span>{detail.TAILLE && detail.TAILLE}</span>;
                })}

                {offer.product_details.map((detail, index) => {
                  return <span>{detail.MARQUE && detail.MARQUE}</span>;
                })}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
