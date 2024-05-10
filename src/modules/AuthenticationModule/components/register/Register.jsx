import React from "react";
import { useEffect, useState } from 'react'
import logofood from "../../../../assets/images/logofood.png";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function register() {
  const navigate = useNavigate();

  let {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

const appendToFormData=()=>{
const formData = new FormData()
formData.append('userName',data.userName)
formData.append('email',data.email)
formData.append('country',data.country)
formData.append('phoneNumber',data.phoneNumber)
formData.append('password',data.password)
formData.append('confirmPassword',data.confirmPassword)
formData.append('profileImage',data.profileImage[0])
return formData
};
  const onSubmit = async (data) => {
  const registerFormData = appendToFormData(data)
    // console.log(data.data);
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Register",
        registerFormData, 
        // {
        //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        // }
      );
      toast.success("Registerd Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Register Failed");
    }
  };

  const goToLogIn = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="container-fluid vh-100 bg-overlay ">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 bg-white p-5 border rounded">
            <div className="text-center">
              <img src={logofood} alt="" className="logofood" />
            </div>
            <div className="form-content">
              <h3>Register</h3>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-mobile"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="UserName"
                        {...register("userName", {
                          required: "User Name is required",
                          pattern: {
                            message: "Invalid User Name",
                          },
                        })}
                      />
                    </div>
                    {errors.userName && (
                      <p className="alert alert-danger p-2">
                        {errors.userName.message}
                      </p>
                    )}

                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-key"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        {...register("country", {
                          required: "country is required",
                          pattern: {
                            message: "Invalid country",
                          },
                        })}
                      />
                    </div>
                    {errors.country && (
                      <p className="alert alert-danger p-2">
                        {errors.country.message}
                      </p>
                    )}
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-key"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Your Password"
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            message: "Invalid Password",
                          },
                        })}
                      />
                    </div>
                    {errors.password && (
                      <p className="alert alert-danger p-2">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
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
                      <p className="alert alert-danger p-2">
                        {errors.email.message}
                      </p>
                    )}

                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-key"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        {...register("phoneNumber", {
                          required: "Phone Number is required",
                          pattern: {
                            message: "Invalid Phone Number",
                          },
                        })}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="alert alert-danger p-2">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-key"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                          required: "Confirm Password is required",
                          validate:(value)=>
                            value===watch('password')||"Passwords don't match"
                          // pattern: {
                          //   message: "Invalid Confirm Password",
                          // },
                        })}
                        
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="alert alert-danger p-2">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="links d-flex justify-content-end my-3">
                  <a
                  onClick={goToLogIn}
                  >
                    <span className="green"> Login Now ?</span>
                  </a>
                </div>
                <button className="btn btn-success w-100">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
