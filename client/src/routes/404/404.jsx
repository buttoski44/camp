import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
export const PageNotFound = () => {
    const location = useLocation();
    return (
        <section className="container">
            <div className="row pt-5 ">
                <div className="col-6 offset-3">
                    <div className="alert alert-danger " role="alert">
                        <h4 className="alert-heading">Page Not Found</h4>
                        <p className="mb-0"> 404</p>
                        <hr />
                        <p><u>{location.pathname}</u></p>
                    </div>
                </div>
            </div>
        </section>
    )
};