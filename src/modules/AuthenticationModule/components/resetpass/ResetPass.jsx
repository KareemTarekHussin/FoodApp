import React from "react";
import logofood from "../../../../assets/images/logofood.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


export default function ResetPass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const resetPasswordResponse = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );
      console.log("Password Reset Successfully", resetPasswordResponse.data);
      toast.success("Password Reset Successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="auth-container ">
      <div className="container-fluid vh-100 bg-overlay ">
        <div className="row  vh-100 justify-content-center align-items-center">
          <div className="col-md-6 bg-white p-3">
            <div className="text-center">
              <img src={logofood} alt="" className="logofood" />
            </div>
            <div className="form-content p-5">
              <h3>Reset Password</h3>
              <p className="text-muted">
                Please Enter Your Otp or Check Your Inbox
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-mobile "></i>
                    </span>
                  
                  <input
                    type="text"
                    className="form-control"
                    placeholder="E-mail"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <p>Email is required</p>}
                </div>

                <div className="input-group mb-3">
                
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-lock "></i>
                    </span>
                  
                  <input
                    type="text"
                    className="form-control"
                    placeholder="OTP"
                    {...register("seed", { required: true })}
                  />
                </div>
                <div className="input-group mb-3">
                
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-lock"></i>
                    </span>
                  
                  <input
                    type="text"
                    className="form-control"
                    placeholder="New Password"
                    {...register("password", { required: true })}
                  />
                </div>
                <div className="input-group mb-3">
                
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-lock"></i>
                    </span>
                  
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Confirm New Password"
                    {...register("confirmPassword", { required: true })}
                  />
                </div>

                <button className="btn btn-success w-100">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
