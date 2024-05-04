import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import toggler from "../../../../assets/images/3.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logofood from "../../../../assets/images/logofood.png";
import ChangePass from "../../../AuthenticationModule/components/changepass/ChangePass";

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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 
  return (<>
    <Modal show={show} onHide={handleClose}>
    <Modal.Body>  
    <ChangePass 
    //TODO:export logout function as props
    />
   
    </Modal.Body>
  </Modal>
    <div className="sidebar-container  rounded-end">
      <Sidebar  collapsed={isCollapse} className="border rounded-end vh-100">
        <Menu>
          <MenuItem active="ps-active"  onClick={toggleCollapse}  className="my-2">
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
          <MenuItem  onClick={handleShow} className="my-2" icon={<i className="fa fa-unlock" aria-hidden="true"></i>}>
             Change Password
             </MenuItem>
          <MenuItem onClick={logout}  className="my-2" icon={<i className="fa fa-right-from-bracket" aria-hidden="true"></i>}>
           Log Out
          </MenuItem>
        </Menu>
      </Sidebar>
      ;
    </div>
    </>);
}
