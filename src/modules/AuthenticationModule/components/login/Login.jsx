import React from "react";
import logofood from "../../../../assets/images/logofood.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// {
//   "email": "kareemtarek3219521@gmail.com",
//   "password": "BarcaR100!"
// }
export default function Login({ saveLoginData }) {
  
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
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      toast.success("Login Successfully");
      // setTimeout(()=>{
      navigate("/dashboard");
      // });
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    }
  };
  const goToForgetPass=()=>{
    navigate('/forgetpass')
  }
  const goToRegister=()=>{
    navigate('/register')
  }
  return (
    <>
      <div className="auth-container ">
        <div className="container-fluid vh-100 bg-overlay border rounded">
          <div className="row  vh-100 justify-content-center align-items-center">
            <div className="col-md-6 bg-white p-5 border rounded">
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
                    <a onClick={goToRegister} className="primary"> Register Now?</a>
                    <a onClick={goToForgetPass}>
                    <span className="green"> Forgot Password ?</span>
                    </a>
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
