import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

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
        src={data.product_image.secure_url}
        alt={data.product_name}
      />

      <div className="offerInformation">
        <span className="price"> {data.product_price} €</span>
        <ul>
          {data.product_details.map((detail, index) => {
            const keys = Object.keys(detail);
            // console.log("=== >", detail[keys]);

            return (
              <li className="descriptionDetail">
                <span className=" detailKey ">{keys[0]}</span>

                <span className=" detail">{detail[keys[0]]}</span>
              </li>
            );
          })}
        </ul>

        <div className="divider"> </div>

        <div>
          <p className="productTitle">{data.product_name}</p>

          <p className="productDescription">{data.product_description}</p>
        </div>
        <div className="username">
          {data.owner.account.avatar ? (
            <img
              className="avatar"
              alt={data.product_name}
              src={data.owner.account.avatar.secure_url}
            />
          ) : (
            ""
          )}
          <span>{data.owner.account.username}</span>
        </div>
        <Link
          state={{
            productName: data.product_name,
            productPrice: data.product_price,
          }}
          className="buy-button"
          to="/payment"
        >
          Acheter
        </Link>
      </div>
    </div>
  );
};

export default Offer;
