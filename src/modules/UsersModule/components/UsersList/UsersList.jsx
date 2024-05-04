import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModule/components/Header/Header'
import headerimg from "../../../../assets/images/header.png";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import NoData from "../../../SharedModule/components/NoData/NoData";
import noDataImg from "../../../../assets/images/no-data.png";
import { Table } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";

 
export default function UsersList() {
  //Delete State
  const [showDelete, setShowDelete] = useState(false);
  const [userId, setUserId] = useState("");
  //Pages State
  const[arrayOfPages,setArrayOfPages]=useState([])
  //Users State
  const [usersList, setUsersList] = useState([]);  //itemid
  //Filteration State
  const [searchByName, setSearchByName] = useState("");
  const [searchByEmail, setSearchByEmail] = useState("");
  
  const handleDeleteClose = () => setShowDelete(false);

  const handleDeleteShow = (id) => {
    setUserId(id);
    setShowDelete(true);
  };
  ;

  //////API's

  const handleDeleteSubmit = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Users/${userId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      handleDeleteClose();
      getRecipesList();
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersList = async (pageNo, userName, email) => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Users/`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            userName: userName,
            email: email,
            pageSize: 20,
            pageNumber: pageNo
          },
        }
      );
      // console.log(response);
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1));
      setUsersList(response.data.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const getUserNameValue = (input) => {
    setSearchByName(input.target.value);
    getUsersList("", input.target.value, searchByEmail);
  };
  const getEmailValue = (input) => {
    setSearchByEmail(input.target.value);
    getUsersList("", searchByName, input.target.value);
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <>
    {/* Delete */}
     <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h2>Delete User</h2>
        </Modal.Header>
        <Modal.Body>
          <DeleteData deleteItem={"User"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    <Header title={"Users List"} 
    description={"You can now add your items that any user can order it from the Application and you can edit" } 
    imgUrl={headerimg}/>
    
    <div className="row justify-content-between mx-4 p-3 ">
        <div className="col-md-6 px-4">
          <h4>
            Users Table Details
          </h4>
          <p>You can check all details</p>
        </div>
        </div>

        <div className="filteration my-3 ">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Search Here..."
                className="form-control "
                onChange={getUserNameValue}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Search Here..."
                className="form-control "
                onChange={getEmailValue}
              />
            </div>

            
          </div>
        </div>
      <div className='p-4'> <Table striped hover>
          <thead className="table-secondary">
            <tr>
              <th>#</th>
              <th>User Name</th>

              <th>Image</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersList.length > 0 ? (
              usersList.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.userName}</td>

                  <td>
                    {item.imagePath ? (
                      <img
                        className="smallImg img-fluid rounded"
                        src={
                          "https://upskilling-egypt.com:3006/" + item.imagePath
                        }
                        alt="Responsive image"
                      />
                    ) : (
                      <img
                        className="smallImg img-fluid rounded"
                        src={noDataImg}
                        alt="Responsive image"
                      />
                    )}
                  </td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.email}</td>
                  <td>
                    <button className="btn">
                      <i
                        className="fa fa-edit"
                        // onClick={handleShow}
                      ></i>
                    </button>
                    <button className="btn">
                      <i
                        className="fa fa-trash"
                        onClick={() => handleDeleteShow(item.id)}
                      ></i>
                    </button>
                  </td>
                </tr>
              ))
              
            ) : (
              <NoData />
            )}
          </tbody>
        </Table></div>
        {/* //try1 */}
        {/* <div className="float-end"> 
        <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item" onClick={()=>getUsersList(searchByName, searchByEmail,3,pageNo)}>
      <a className="page-link"  aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {arrayOfPages?.map((pageNo)=>(
        <li className="page-item"><a className="page-link" >{pageNo}</a></li>
    ))}
   
    <li className="page-item">
      <a className="page-link"  aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav></div> */}
        <div className="d-flex justify-content-center align-items-center p-5">
                  <Pagination >
                    <Pagination.First />
                    <Pagination.Prev/>
  
                    {arrayOfPages?.map((pageNo) => (
                      <Pagination.Item
                        key={pageNo}
                        onClick={() =>
                          getUsersList(pageNo, searchByName, searchByEmail)
                        }
                      >
                        {pageNo}
                      </Pagination.Item>
                    ))}
  
                    <Pagination.Next/>
                    <Pagination.Last />
                  </Pagination > 
                </div>

    
    </>
    
  )
}
