import { useState } from "react";
import axios from "axios";
import { navigate, useNavigate } from "react-router-dom";

const Publish = ({ token, baseUrl }) => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();

      formData.append("title", title);
      formData.append("picture", file);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", location);
      formData.append("price", price);

      const response = await axios.post(`${baseUrl}/offer/publish`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <div className="body-publish">
      <div className="publish-container">
        <form onSubmit={handleSubmit}>
          <h2> Vends ton article</h2>
          <div className="publish-img">
            <input
              type="file"
              onChange={(event) => {
                setFile(event.target.files[0]);
                setPreview(URL.createObjectURL(event.target.files[0]));
              }}
            />
            <img className="preview-img" src={preview} />
          </div>

          <div className="publish-description">
            <div className="text-input">
              <span>Titre</span>
              <input
                type="text"
                placeholder=" ex: Chemise Sézane verte"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            <div className="text-input">
              <span>Décris ton article</span>
              <input
                type="text"
                placeholder=" ex: peu porté, taille correctement"
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>

          <div className="publish-details">
            <div className="text-input">
              <span>Marque</span>
              <input
                type="text"
                placeholder="ex: Zara "
                onChange={(event) => setBrand(event.target.value)}
              />
            </div>

            <div className="text-input">
              <span>Taille</span>
              <input
                type="text"
                placeholder="ex: L / 40 / 12"
                onChange={(event) => setSize(event.target.value)}
              />
            </div>

            <div className="text-input">
              <span>Couleur</span>
              <input
                type="text"
                placeholder=" ex: Rouge"
                onChange={(event) => setColor(event.target.value)}
              />
            </div>
            <div className="text-input">
              <span>Etat</span>
              <input
                type="text"
                placeholder="ex: Neuf avec étiquette"
                onChange={(event) => setCondition(event.target.value)}
              />
            </div>

            <div className="text-input">
              <span>Lieu</span>
              <input
                type="text"
                placeholder="ex: Paris "
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>
          </div>

          <div className="publish-price">
            <div className="text-input">
              <span>Prix</span>
              <input
                type="text"
                placeholder="ex: 0,00€ "
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>

            <input type="checkbox" />
            <span>Je suis intéressé(e) par les échanges </span>
          </div>

          <input type="submit" value=" Ajouter" />
        </form>
      </div>
    </div>
  ) : (
    // <Redirect to={{
    //   pathname:"/login",
    //   state={fromPublish: true },
    // }}
    // />
    <> </>
  );
};

export default Publish;
