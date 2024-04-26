import React from "react";
import logofood from "../../../../assets/images/logofood.png";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/dashboard");
  }
  return (
    <div className="notfound container-fluid">
      <div className=" container ">
        <div className="row">
          <div className="col-6 p-2">
            <img className="img-fluid" alt="Responsive image" src={logofood} />
          </div>
        </div>
        <div className="row align-items-center p-5 my-4 ">
          <div className="col-6">
            <div className="col-6">
              <h1>
                <b>Oops.</b>
              </h1>
              <h2>Page &nbsp; not found</h2>
              <p className="my-3">
                This Page doesn’t exist or was removed! We suggest you back to
                home.
              </p>
            </div>
            <div className="my-5">
            <button onClick={handleClick} className="btn btn-success w-50">
              <i className="fa-solid fa-arrow-left"></i>
              &nbsp;
              Back To Home
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
