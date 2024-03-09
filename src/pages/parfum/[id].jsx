import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import axios from "axios";
function EditParfum() {
    const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState({
    nom: "",
    description: "",
    photo: "",
    isShowed:""
  });
  console.log(data)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", data);
    try {
      const response = await axios.put(
        `http://localhost:8081/api/parfum/${id}`, data
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.log("Error posting data:", error);
    }
  };
  
  return (
    <>
      <h2>change the parfum data</h2>
      <div className="container mt-5">
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
          <div className="form-group">
            <label htmlFor="nom">IsShowed</label>
            <input
              type="text"
              className="form-control"
              id="isShowed"
              name="isShowed"
              onChange={handleChange}
              value={data.isShowed}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Ajouter
          </button>
        </form>
      </div>
    </>
  );
}
export default EditParfum