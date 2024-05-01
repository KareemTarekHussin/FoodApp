import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import headerimg from "../../../../assets/images/home-avatar.svg";
import axios from "axios";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NoData from "../../../SharedModule/components/NoData/NoData";
import noDataImg from "../../../../assets/images/no-data.png";
import "./RecipesList.css"
import Modal from "react-bootstrap/Modal";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [recipeId,setRecipeId]=useState('');

  const [showDelete,setShowDelete] = useState(false)
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => {
  setRecipeId(id)
  setShowDelete(true)
  }
  const getRecipesList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);
      setRecipesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

//Delete Recipe
const handleDeleteSubmit= async() => {
  try {
    let response = await axios.delete(
      `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
handleDeleteClose()
  getRecipesList();
  } catch (error) {
    console.log(error);
  }

}
  useEffect(() => {
    getRecipesList();
  }, []);

  return (
    <>
      <Header
        title={"Welcome Upskilling!"}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imgUrl={headerimg}
      />
        <Modal show={showDelete} onHide={handleDeleteClose}>
              <Modal.Header closeButton>
              
                  <h2>Delete Recipe</h2>
              
              </Modal.Header>
              <Modal.Body>
              <DeleteData deleteItem={"Recipe"}/>
              </Modal.Body>
              <Modal.Footer>
          
          <Button variant="danger" onClick={handleDeleteSubmit}>
          Delete
          </Button>
        </Modal.Footer>
            </Modal>
      <div className="container-fluid">
        <div className="row p-4">
          <div className="col-md-6">
            <h4>Recipes Table Details</h4>
            <span>You can check all details</span>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <button
              className="btn btn-success "
              // onClick={handleShow}
            >
              Add New Item
            </button>
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>

              <th>Image</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Tag</th>
            </tr>
          </thead>
          <tbody>
            {recipesList.length > 0 ? (
              recipesList.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                 
                  <td>{item.imagePath ? <img className="smallImg img-fluid rounded" src={'https://upskilling-egypt.com:3006/'+item.imagePath}  alt="Responsive image"/>
                  :(<img className="smallImg img-fluid rounded" src={noDataImg} alt="Responsive image"/>)}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.category.name}</td>
                  <td>{item.tag.name}</td>
                  <td>
                    <button className="btn">
                      <i className="fa fa-edit" 
                      // onClick={handleShow}
                      ></i>
                    </button>
                    <button className="btn">
                      <i
                        className="fa fa-trash"
                        onClick={()=>handleDeleteShow(item.id)}
                      ></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}
