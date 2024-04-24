import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SideBar() {
const navigate = useNavigate();

const logout = ()=>{
  localStorage.removeItem('token');
  navigate("/login");
}




  return (
    
    <div>SideBar
      <button onClick={logout} className='btn btn-danger'>Logout</button>
    </div>
  )
}
