import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Footer } from "../footer/footer";
export const Navbar = () => {
  return (
    <>
      <nav
        className="navbar sticky-top navbar-expand-lg bg-dark"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Camp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/campgrounds">
                Campgrounds
              </Link>
              <Link className="nav-link" to="/campgrounds/new">
                New Campground
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
};
