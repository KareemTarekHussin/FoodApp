import React from 'react'
import logofood from "../../../../assets/images/logofood.png";
import {  useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
export default function ChangePass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

 const onSubmit = async (data) => {
    try {
      let response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
        data, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
     logout();
      toast.success("Password Changed Sucessfully");
      navigate("/login"); 
    } catch (error) {
      console.log(error);
      toast.error("Password Failed to Change");
    }
  };

  return (
    <div className="container-fluid p-4">
        <div className="row  justify-content-center align-items-center">
          <div className="col-md-12 ">
            <div className="text-center">
              <img src={logofood} alt="" className="logofood w-100" />
            </div>
            <div className="form-content ">
              <h3>Change Your Password</h3>
              <p className="text-muted">
                Enter Your Details Below
              </p>
              <form 
              onSubmit={handleSubmit(onSubmit)}
              >
                <div className="input-group mb-3">
                    <span className="input-group-text border-0 allTextBg" id="basic-addon1">
                      <i className="fa fa-lock "></i>
                    </span>
                  <input
                    type="text"
                    className="form-control border-0 allTextBg"
                    placeholder="Old Password"
                    {...register("oldPassword", { required: "Old Password is Required" })}
                  />
                </div>
                 {errors.oldPassword && (
                    <p className="alert alert-danger p-2">{errors.oldPassword.message}</p>
                  )}

                <div className="input-group mb-3">
                    <span className="input-group-text border-0 allTextBg" id="basic-addon1">
                      <i className="fa fa-lock "></i>
                    </span>
                  <input
                    type="text"
                    className="form-control border-0 allTextBg"
                    placeholder="New Password"
                    {...register("newPassword", { required: "New Password is Required" })}
                  />
                </div>
                 {errors.newPassword && (
                    <p className="alert alert-danger p-2">{errors.newPassword.message}</p>
                  )}

                <div className="input-group mb-3">
                    <span className="input-group-text border-0 allTextBg" id="basic-addon1">
                      <i className="fa fa-lock "></i>
                    </span>
                  <input
                    type="text"
                    className="form-control border-0 allTextBg"
                    placeholder="Confirm New Password"
                    {...register("confirmNewPassword", { required: "Confirm New Password is Required" })}
                  />
                </div>
                 {errors.confirmNewPassword && (
                    <p className="alert alert-danger p-2">{errors.confirmNewPassword.message}</p>
                  )}
             

                <button className="btn btn-success w-100">
                Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}
