const Home = ({ offers }) => {
  console.log(offers);
  return (
    <div className="offers">
      {offers.map((elem, index) => {
        return (
          <div className="offer">
            <span>{elem.owner.account.username}</span>
            <img
              className="img"
              src={elem.product_image.secure_url}
              alt="img"
            />
            <span>{elem.product_price} €</span>
            {elem.product_details.map((detail, index) => {
              return <div>{detail.TAILLE && detail.TAILLE}</div>;
            })}

            {elem.product_details.map((detail, index) => {
              return <div>{detail.MARQUE && detail.MARQUE}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
