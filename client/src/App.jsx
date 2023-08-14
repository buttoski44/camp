import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./component/navbar/navbar";
import { Home } from "./routes/home/home";
import { Campground } from "./routes/campground/campground";
import { Campgrounds } from "./routes/campgrounds/campgrounds";
import { NewCampground } from "./routes/new-campground/new-campground";
import { Edit } from "./routes/edit/edit";
import { PageNotFound } from "./routes/404/404";
// import { ErrorContext } from "./context/error.context";
// import { useContext } from "react";


// const ProtetctedRoute = ({ children }) => {
//   if (!error) {
//     return <Navigate to="/login" />
//   }

//   return children;
// }
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/campgrounds" element={<Campgrounds />} />
        <Route path="/campgrounds/new" element={<NewCampground />} />
        <Route path="/campgrounds/:id" element={<Campground />} />
        <Route path="/campgrounds/:id/edit" element={<Edit />} />
        <Route path="/Error" element={<PageNotFound />} />
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
