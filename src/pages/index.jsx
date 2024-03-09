import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [cardData, setcardData] = useState([]);
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
  return (<><h2>Current Parfum</h2><div className="row">
    {cardData.map((item, index) => (
      <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div className="card shadow-sm">
          <img
            src={item.photo}
            className="card-img-top"
            alt={item.nom}
            style={{ objectFit: "cover", height: "200px" }} />
          <div className="card-body">
            <h6 className="card-title">{item.nom}</h6>
            <p className="card-text text-muted small">
              {item.description.substring(0, 80)}...
            </p>
          </div>
        </div>
      </div>
    ))}
  </div></>
  )
}
