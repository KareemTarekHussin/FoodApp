import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import headerimg from "../../../../assets/images/home-avatar.svg";
import axios from "axios";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NoData from "../../../SharedModule/components/NoData/NoData";
import noDataImg from "../../../../assets/images/no-data.png";
import "./RecipesList.css";
import Modal from "react-bootstrap/Modal";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import { useNavigate } from "react-router-dom";

export default function RecipesList() {
  const navigate = useNavigate();
  const [recipesList, setRecipesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [recipeId, setRecipeId] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [catValue, setCatValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const[arrayOfPages,setArrayOfPages]=useState([]);

  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => {
    setRecipeId(id);
    setShowDelete(true);
  };

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getRecipesList(input.target.value,tagValue,catValue);
  };

  const getCatValue = (input) => {
    setCatValue(input.target.value);
    getRecipesList(nameValue, tagValue, input.target.value);
  };

  const getTagValue = (input) => {
    setTagValue(input.target.value);
    getRecipesList(nameValue, input.target.value, catValue);
  };

  const getTagsList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // console.log(response.data);
      setTagsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategoriesList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // console.log(response.data.data);
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRecipesList = async (name, tagId, catId,pageSize,pageNo) => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=${pageSize}&pageNumber=${pageNo}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            name: name,
            tagId: tagId,
            categoryId: catId,
            pageSize: 5,
            pageNumber: pageNo
          },
        }
      );
      // console.log(response);
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1));
      setRecipesList(response.data.data);
    } catch (error) {
      // console.log(error);
    }
  };

  //Delete Recipe
  const handleDeleteSubmit = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
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

  useEffect(() => {
    getRecipesList("","","",3,1);
    getCategoriesList();
    getTagsList();
  }, []);

  const goToRecipeData = () => {
    navigate("/dashboard/recipeData");
  };

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
          <DeleteData deleteItem={"Recipe"} />
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
            <button className="btn btn-success " onClick={goToRecipeData}>
              Add New Item
            </button>
          </div>
        </div>
        {/* filteration */}
        <div className="filteration my-3 ">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Search Here..."
                className="form-control "
                onChange={getNameValue}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-control text-muted"
                onChange={getTagValue}
              >
                <option value="" className="text-muted">
                  Category
                </option>
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 ">
              <select
                className="form-control text-muted"
                onChange={getCatValue}
              >
                <option value="" className="text-muted">
                  Tag
                </option>
                {tagsList.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
            
          </div>
        </div>
        {/* array of recipe items */}
        <Table striped hover>
          <thead className="table-secondary">
            <tr>
              <th>#</th>
              <th>Item Name</th>

              <th>Image</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Tag</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recipesList.length > 0 ? (
              recipesList.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>

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
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.category[0]?.name}</td>
                  <td>{item.tag.name}</td>
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
        </Table>
        
        <div className="float-end"> 
        <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item" onClick={()=>getRecipesList(nameValue,tagValue,catValue,3,pageNo)}>
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
</nav></div>
      </div>
    </>
  );
}
