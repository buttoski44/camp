import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const Campground = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campground, setCampground] = useState({});
  useEffect(() => {
    const apiRequest = async () => {
      const res = await axios.get(`/api/campgrounds/${id}`);
      setCampground(res.data);
    };

    apiRequest();
  }, []);

  const onclickHanlder = async (id) => {
    const res = await axios.delete(`/api/campgrounds/${id}`);
    if (res.data.message) {
      navigate("/campgrounds");
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <img src={campground.image} class="card-img-top" alt="" />
            <div className="card-body">
              <h5 className="card-title">{campground.title}</h5>
              <p className="card-text">{campground.description}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item text-secondary">
                {campground.location}
              </li>
              <li className="list-group-item fw-bold">
                ${campground.price}/night
              </li>
            </ul>
            <div className="card-body">
              <Link
                to={`/campgrounds/${id}/edit`}
                className="btn btn-info me-2"
              >
                Edit
              </Link>
              <button
                to={`/campgrounds/${id}/edit`}
                className="btn btn-danger"
                onClick={() => onclickHanlder(id)}
              >
                Delet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
