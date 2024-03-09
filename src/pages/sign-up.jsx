import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
function SignUp() {
  const router = useRouter()
  const [data, setData] = useState({
    nom: "",
    email: "",
    mdp: "",
  });

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
      const response = await axios.post("http://localhost:8081/register", data);
      console.log("Response:", response.data);
      localStorage.setItem("token", response.data.token);
      alert("logged in");
      router.push("/")
    } catch (error) {
      alert("an error");
      console.error("Error posting data:", error);
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Create an Account</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="Email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={data.email}
                    onChange={handleChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We will never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="Password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="Password"
                    name="mdp"
                    placeholder="Password"
                    value={data.mdp}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Name"
                    name="nom"
                    placeholder="Name"
                    value={data.nom}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
