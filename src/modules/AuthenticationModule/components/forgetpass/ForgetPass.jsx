import React from "react";
import logofood from "../../../../assets/images/logofood.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


export default function Forgetpass() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const forgetPasswordResponse = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data
      );
      console.log("Reset password", forgetPasswordResponse.data);
      toast.success("Email Sent");
      navigate("/resetpass");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
    
    <div className="auth-container ">
      <div className="container-fluid vh-100 bg-overlay ">
        <div className="row  vh-100 justify-content-center align-items-center ">
          <div className="col-md-6 bg-white p-3 border rounded">
            <div className="text-center">
              <img src={logofood} alt="" className="logofood" />
            </div>
            <section className="justif">
              <div className="form-content p-5">
                <h3>Forgot Your Password?</h3>
                <p className="text-muted">
                  No worries! Please enter your email and we will send a
                  password reset link
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3 my-5">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-mobile"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your E-mail"
                      {...register("email",{ required: true })}
                      
                    />
                    {errors.email && <p>Email is required</p>}
                  </div>

                  <button className="btn btn-success w-100 my-5">Submit</button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
