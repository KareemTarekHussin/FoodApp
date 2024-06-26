import React from "react";
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function MasterLayout({ loginData }) {
  return (
    <div className="d-flex">
      <div >
        <SideBar loginData={loginData}/>
      </div>

      <div className="w-100">
        <Navbar loginData={loginData} />
       
        <Outlet />
      </div>
    </div>
  );
}
