import React from 'react'
import { useEffect, useState } from 'react'
import logofood from "../../../../assets/images/logofood.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyAccount() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
  
    const onSubmit = async (data) => {
      try {
        const verifyResponse = await axios.put(
          "https://upskilling-egypt.com:3006/api/v1/Users/verify",
          data
        );
        toast.success("Account Verified Successfully");
        navigate("/login");
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
                <h3>Verification Code</h3>
                <p className="text-muted">
                 Please Enter Verification Code!
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group ">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-mobile"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your E-mail"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid Mail",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="alert alert-danger">{errors.email.message}</p>
                  )}
                  <div className="input-group  my-2">
                 
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-mobile"></i>
                      </span>
                    
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Verification Code!"
                      {...register("code",{ required:"Code is Required" })}
                      
                    />
                     {errors.code && (
                    <p className="alert alert-danger">{errors.code.message}</p>
                  )}
                  </div>

                  <button className="btn btn-success w-100 my-2">Verify</button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
