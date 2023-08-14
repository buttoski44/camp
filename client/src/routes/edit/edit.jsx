import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Error } from "../../component/error/error";
// has same problem as new-campground form
const resetObject = {
  title: "",
  image: "",
  price: 0,
  description: "",
  location: "",
};

export const Edit = () => {
  const [updateCampground, setUpdateCampground] = useState(resetObject);
  const [error, setError] = useState({ success: true });
  const [valid, setValid] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const apiRequest = async () => {
      try {
        const resGet = await axios.get(`/api/campgrounds/${id}`);
        setUpdateCampground(resGet.data);
      } catch (error) {
        setError(error.response.data);
      }
    };

    apiRequest();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const campground = {
        title: updateCampground.title,
        image: updateCampground.image,
        price: updateCampground.price,
        description: updateCampground.description,
        location: updateCampground.location
      }
      const resPut = await axios.put(`/api/campgrounds/${id}`, { campground });
      if (!error) {
        setUpdateCampground(resetObject);
        navigate("/campgrounds");
      }
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handleValid = (e) => {
    e.stopPropagation();
    setValid(true);
    setTimeout(() => {
      setValid(false);
    }, 5000);
  }

  const handleChange = (e) => {
    if (e.target.name === "name" && /[0-9]|\./.test(e.target.value)) {
      setUpdateCampground({ ...updateCampground, price: e.target.value });
    } else {
      setUpdateCampground({ ...updateCampground, [e.target.name]: e.target.value });
    }
  };

  return (
    <section className="container my-5">
      {!error.success && <Error message={error.message} />}
      <div className="row">
        <h1 className="text-center">New Campground</h1>
        <div className="col-6 offset-3">
          <form onSubmit={handleSubmit}>
            <div className={`mb-3 ${valid ? "was-validated" : null}`}>
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                name="title"
                value={updateCampground.title}
                type="text"
                id="title"
                className="form-control"
                onChange={handleChange}
                onInvalid={handleValid}
                required
              />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className={`mb-3 ${valid ? "was-validated" : null}`}>
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                value={updateCampground.description}
                type="text"
                id="description"
                className="form-control "
                onChange={handleChange}
                onInvalid={handleValid}
                required
              />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className={`mb-3 ${valid ? "was-validated" : null}`}>
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                name="location"
                value={updateCampground.location}
                type="text"
                id="location"
                className="form-control"
                onChange={handleChange}
                onInvalid={handleValid}
                required
              />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className={`mb-3 ${valid ? "was-validated" : null}`}>
              <label htmlFor="image" className="form-label">
                Image URL
              </label>
              <input
                name="image"
                value={updateCampground.image}
                type="text"
                id="image"
                className="form-control"
                onChange={handleChange}
                onInvalid={handleValid}
                required
              />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className={`mb-3 ${valid ? "was-validated" : null}`}>
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input
                  name="price"
                  value={updateCampground.price}
                  id="price"
                  type="text"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  onChange={handleChange}
                  onInvalid={handleValid}
                  required
                />
                <div className="valid-feedback">
                  Looks good!
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Add New
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
