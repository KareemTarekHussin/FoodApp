import React from "react";
import logofood from "../../../../assets/images/logofood.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// {
//   "email": "kareemtarek3219521@gmail.com",
//   "password": "BarcaR10!"
// }
export default function Login({saveLoginData}) {
//go to forgetpass
  const handleAnchorClick = (event) => {
    event.preventDefault(); 
    navigate('/forgetpass'); 
  };
  // register ,handlesubmit,formState
  // data ,api-integration ,validation
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );
      localStorage.setItem("token",response.data.token);
      saveLoginData();
      toast.success("Login Successfully");
      // setTimeout(()=>{
        navigate("/dashboard")
      // });
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    }
  };

  return (
    <>
 
   
    <div className="auth-container ">
      <div className="container-fluid vh-100 bg-overlay ">
        <div className="row  vh-100 justify-content-center align-items-center">
          <div className="col-md-6 bg-white p-3">
            <div className="text-center">
              <img src={logofood} alt="" className="logofood" />
            </div>
            <div className="form-content">
              <h3>Log In</h3>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-mobile"></i>
                    </span>
                  </div>
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
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        message: "Invalid Mail",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="alert alert-danger">
                    {errors.password.message}
                  </p>
                )}
                <div className="links d-flex justify-content-between my-3">
                  <a>Register Now?</a>
                  
                  <a href="/forgetpass" onClick={handleAnchorClick}>Forgot Password ?</a>
                </div>
                <button className="btn btn-success w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
