import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export const Home = () => {
  const [message, setMessage] = useState(null);
  useEffect(() => {
    const apiRequest = async () => {
      const res = await axios.get("/api");
      setMessage(res.data.message);
    };

    apiRequest();
  }, []);
  return (
    <section className="container mt-5">
      <h1 className="text-xl text-[#adadad]">
        {!message ? "Loading..." : message}
      </h1>
    </section>
  );
};
