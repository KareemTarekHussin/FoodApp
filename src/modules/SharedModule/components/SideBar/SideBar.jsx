import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import toggler from "../../../../assets/images/3.png";

export default function SideBar() {

const [isCollapse,setIsCollapse]=useState(false)
const toggleCollapse = ()=>{
  setIsCollapse(!isCollapse)
}

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar-container  rounded-end">
      <Sidebar collapsed={isCollapse} className="border rounded-end">
        <Menu>
          <MenuItem onClick={toggleCollapse}  className="my-2">
            <img src={toggler} alt="" />
          </MenuItem>
          <MenuItem
          className="my-2"
            icon={<i className="fa fa-home" aria-hidden="true"></i>}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          <MenuItem
           className="my-2"
            icon={<i className="fa  fa-user-group" aria-hidden="true"></i>}
            component={<Link to="/dashboard/users" />}
          >
            Users
          </MenuItem>
          <MenuItem
           className="my-2"
            icon={<i className="fa fa-calendar" aria-hidden="true"></i>}
            component={<Link to="/dashboard/recipes" />}
          >
            Recipes
          </MenuItem>
          <MenuItem
           className="my-2"
            icon={<i className="fa fa-calendar" aria-hidden="true"></i>}
            component={<Link to="/dashboard/categories" />}
          >
            Categories
          </MenuItem>
          <MenuItem  className="my-2" icon={<i className="fa fa-unlock" aria-hidden="true"></i>}> Change Password</MenuItem>
          <MenuItem   className="my-2" icon={<i className="fa fa-right-from-bracket" aria-hidden="true"></i>}>
          
            <button onClick={logout} className="btn btn-outline-success ">
              Logout
            </button>
          </MenuItem>
        </Menu>
      </Sidebar>
      ;
    </div>
  );
}
