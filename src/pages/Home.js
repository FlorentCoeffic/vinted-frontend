const Home = ({ data }) => {
  return (
    <div>
      {data.map((elem, index) => {
        return (
          <div>
            <span>{elem.product_details}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
