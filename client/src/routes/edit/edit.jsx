import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const resetObject = {
  title: "",
  image: "",
  price: 0,
  description: "",
  location: "",
};

export const Edit = () => {
  const [campground, setCampground] = useState(resetObject);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const apiRequest = async () => {
      const resGet = await axios.get(`/api/campgrounds/${id}`);
      setCampground(resGet.data);
    };

    apiRequest();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resPut = await axios.put(`/api/campgrounds/${id}`, campground);
    setError(resPut.data.message);
    if (!error) {
      setCampground(resetObject);
      navigate("/campgrounds");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "name" && /[0-9]|\./.test(e.target.value)) {
      setCampground({ ...campground, price: e.target.value });
    } else {
      setCampground({ ...campground, [e.target.name]: e.target.value });
    }
  };

  return (
    <section className="container my-5">
      {/* {error && (
        <div
          className="alert alert-success d-flex align-items-center py-3 "
          role="alert"
        >
          <div>success</div>
        </div>
      )} */}
      <div className="row">
        <h1 className="text-center">New Campground</h1>
        <div className="col-6 offset-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              name="title"
              value={campground.title}
              type="text"
              id="title"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              value={campground.description}
              type="text"
              id="description"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              name="location"
              value={campground.location}
              type="text"
              id="location"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image URL
            </label>
            <input
              name="image"
              value={campground.image}
              type="text"
              id="image"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">$</span>
              <input
                name="price"
                value={campground.price}
                id="price"
                type="text"
                className="form-control"
                aria-label="Amount (to the nearest dollar)"
                onChange={handleChange}
                required
              />
              <span className="input-group-text">.00</span>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onSubmit={handleSubmit}
          >
            Add New
          </button>
        </div>
      </div>
    </section>
  );
};
