import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { set } from "js-cookie";
import tear from "../asset/img/tear.svg";

const Home = ({ searchResult, baseUrl }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/offers?page=${page}`);

        console.log(response.data.count);
        setNumPage(
          Array.from(Array(Math.ceil(response.data.count / 15)).keys())
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    setData(searchResult);
  }, [searchResult]);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div>
      <div className="hero">
        <img src={tear} alt="tear" className="imgDecoration" />
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
        </div>
      </div>

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

      <div className="pagination">
        {numPage.map((page) => {
          return (
            <button
              onClick={() => {
                setPage(page + 1);
              }}
            >
              {page + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
