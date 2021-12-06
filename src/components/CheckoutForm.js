import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ token, productName, productPrice, baseUrl }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [succeed, setSucceed] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const price = productPrice;
  const securityFees = price / 10;
  const deliveryFees = securityFees * 2;
  const totalPrice = price + securityFees + deliveryFees;
  console.log(totalPrice);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      console.log(cardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      console.log("salut");

      const stripeToken = stripeResponse.token.id;
      console.log(stripeToken);
      const response = await axios.post(`${baseUrl}/payment`, {
        token: "tok_visa",
        amount: totalPrice,
        title: productName,
      });
      if (response.data.status === "succeeded") {
        setSucceed(true);
        setConfirmMessage("Paiement valide !");
      }
    } catch (error) {
      console.log(error.message);
      console.log("555 coucou");
    }
  };
  return (
    <div>
      {succeed ? (
        <p>Paiement validé</p>
      ) : (
        <div className=" formPage">
          <form className="checkoutForm" onSubmit={handleSubmit}>
            <h3 className="checkoutFormTitle">Résumé de la commande</h3>
            <div className="price">
              <span>Commande</span>
              <span> {price} €</span>
            </div>

            <div className="price">
              <span> Frais protection acheteurs</span>
              <span> {securityFees} € </span>
            </div>

            <div className="price">
              <span>Frais de port</span>
              <span>{deliveryFees} €</span>
            </div>
            <div className="divider"></div>

            <div className="totalPrice">
              <span>Total</span>
              <span>{totalPrice}</span>
            </div>
            <p>
              Il ne vous reste plus qu'un étape pour vous offrir
              <span className="bold"> {productName}</span>. Vous allez payer
              <span className="bold"> {productPrice}€</span> (frais de
              protection et frais de port inclus).
            </p>
            <div className="divider"></div>
            <CardElement />
            <div className="divider"></div>
            <input className="payButton" type="submit" value="pay" />

            <span>{confirmMessage}</span>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
