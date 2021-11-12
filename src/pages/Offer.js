import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );

        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div className="offerCard">
      <img
        className="offerPicture"
        src={data.product_pictures[0].secure_url}
        alt={data.product_name}
      />
      <span> {data.product_price} €</span>

      <ul>
        {data.product_details.map((detail, index) => {
          const keys = Object.keys(detail);
          return (
            <li>
              <span>{keys[0]}</span>
              <span>{detail[keys[0]]}</span>
            </li>
          );
        })}
      </ul>

      <div>
        <span>{data.product_name}</span>

        <span>{data.product_description}</span>

        <span>{data.owner.account.username}</span>
      </div>
    </div>
  );
};

export default Offer;
