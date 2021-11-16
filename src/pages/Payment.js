import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Payment = ({ token }) => {
  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

  const location = useLocation();
  const { productName, productPrice } = location.state;
  return token ? (
    <Elements stripe={stripePromise}>
      <CheckoutForm productName={productName} productPrice={productPrice} />
    </Elements>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Payment;
