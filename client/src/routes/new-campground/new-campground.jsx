import { useState } from "react";
import axios from "axios";
import { Error } from "../../component/error/error";
const resetObject = {
  title: "",
  image: "",
  price: "",
  description: "",
  location: "",
};

export const NewCampground = () => {
  const [campground, setCampground] = useState(resetObject);
  const [error, setError] = useState({ success: true });
  const [valid, setValid] = useState(false);
  // console.log(error);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/campground", {
        campground
        // for avoiding error conver price value in Number first
      });
      if (!error) {
        setCampground(resetObject);
      }
    } catch (error) {
      setError(error.response.data)
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
    // if (e.target.name !== "price") {
    setCampground({ ...campground, [e.target.name]: e.target.value });
    // } else {
    //   if (/[0-9]|\./.test(e.target.value)) {
    //     setCampground({ ...campground, [e.target.name]: e.target.value });
    //   }
    // }
  };

  // there are no error at server side for price input whic means server is price as number.server side recives request first number or numbers character(if input box has '12hbd67' as input , character after ' '12' does get sippped to server even if there are numbers.
  // bugs
  // 1. you cant type alphabates as first letter in input box , you have to type number as first letter in input box .but after typing number you can type any charater in input box.
  // 2. those character are not causing any error on server or client side.which mean there are appearing in input box but there value is not setting to state and shipping to server due to regx fiter
  // 3. in case if you type first character a number or number and after you type non number character and then you type a number (1bdd67[67 gets discared] or 127jha26[26 gets discared]), is does not consider those number as valid number cuz they are not setting to state, which means there might be fault in regx filter

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
                value={campground.title}
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
                value={campground.description}
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
                value={campground.location}
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
                value={campground.image}
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
                  value={campground.price}
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
