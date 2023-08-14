import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//bug
// 1. every card does not get unique image
export const Campgrounds = () => {
  const [campgrounds, setCampgrounds] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const apiRequest = async () => {
      const res = await axios.get("/api/campgrounds");
      setCampgrounds(res.data);
    };

    apiRequest();
  }, []);

  const onclickHanlder = async (id) => {
    const res = await axios.delete(`/api/campgrounds/${id}`);
    setError(!res.data.success);
    if (!error) {
      const newCampgrounds = campgrounds.filter((camp) => camp._id !== id);
      setCampgrounds(newCampgrounds);
    }
  };

  return (
    <section className="container my-5">
      <h1 className="h1 py-3">All Campgrounds</h1>
      {error && (
        <span
          className="alert alert-danger d-flex align-items-center py-3 "
          role="alert"
        >
          Error!
        </span>
      )}
      <div className="">
        {campgrounds.map((camp) => (
          <div className="card mb-3" key={camp._id}>
            <div className="row">
              <div className="col-md-4">
                <img className="img-fluid" src={camp.image} alt="" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{camp.title}</h5>
                  <p className="card-text">{camp.description}</p>
                  <p className="card-text">
                    <small className="text-secondary">{camp.location}</small>
                  </p>
                  <h6 className="card-text fw-bold">${camp.price}</h6>
                  <Link
                    to={`/campgrounds/${camp._id}`}
                    className="btn btn-primary"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => onclickHanlder(camp._id)}
                    className="btn btn-danger mx-3"
                  >
                    Delet
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
