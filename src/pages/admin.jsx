import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function Admin() {
  const router = useRouter();
  const [data, setData] = useState({
    nom: "",
    description: "",
    photo: "",
  });
  const [cardData, setcardData] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", data);
    try {
      const response = await axios.post(
        "http://localhost:8081/api/parfum",
        data
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.log("Error posting data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8081/api/parfum")
      .then((response) => {
        setcardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  function handleEdit(id) {
    router.push({
      pathname: `/parfum/${id}`
    })
  }
  return (
    <div className="container mt-5">
      <h2>Ajouter un Parfum</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom du Parfum</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            name="nom"
            onChange={handleChange}
            value={data.nom}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="4"
            onChange={handleChange}
            value={data.description}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="photo">Photo</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            id="photo"
            name="photo"
            value={data.photo}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </form>
      <div className="container mt-5">
        <h2>Current Parfum</h2>
        <div className="row">
          {cardData.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card shadow-sm">
                <img
                  src={item.photo}
                  className="card-img-top"
                  alt={item.nom}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h6 className="card-title">{item.nom}</h6>
                  <p className="card-text text-muted small">
                    {item.description.substring(0, 80)}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id)}
                  >
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
