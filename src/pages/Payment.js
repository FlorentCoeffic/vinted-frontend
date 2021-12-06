import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Payment = ({ token, baseUrl }) => {
  const stripePromise = loadStripe(
    "pk_test_51JwRmlDvCv1XQM1NixzwUPi2ZMroWY7JlxPjxFx9U48Z4bFCTGFksXEY5gYLrFtfX7FiusfvJOWbtsb00UsNvZyY00UDDCGgrl"
  );

  const location = useLocation();
  const { productName, productPrice } = location.state;
  return token ? (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        productName={productName}
        productPrice={productPrice}
        baseUrl={baseUrl}
      />
    </Elements>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Payment;
