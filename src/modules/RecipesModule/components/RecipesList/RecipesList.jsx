import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import headerimg from "../../../../assets/images/home-avatar.svg";
import axios from "axios";
import { Pagination, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NoData from "../../../SharedModule/components/NoData/NoData";
import noDataImg from "../../../../assets/images/no-data.png";
import "./RecipesList.css";
import Modal from "react-bootstrap/Modal";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function RecipesList() {
  const navigate = useNavigate();
  const [recipesList, setRecipesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [recipeId, setRecipeId] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [catValue, setCatValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [userData, setUserData] = useState(null);
  const [arrayOfPages, setArrayOfPages] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => {
    setRecipeId(id);
    setShowDelete(true);
  };

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getRecipesList(1, input.target.value, tagValue, catValue);
  };

  const getCatValue = (input) => {
    setCatValue(input.target.value);
    getRecipesList(1, nameValue, tagValue, input.target.value);
  };

  const getTagValue = (input) => {
    setTagValue(input.target.value);
    getRecipesList(1, nameValue, input.target.value, catValue);
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

  const getRecipesList = async (name, tagId, catId, pageSize, pageNo) => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=${pageSize}&pageNumber=${pageNo}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            name: name,
            tagId: tagId,
            categoryId: catId,

            pageNumber: pageNo,
          },
        }
      );
      console.log(response.data.data);
      setRecipesList(response.data.data);
      setArrayOfPages(
        Array(response?.data?.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
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
    getRecipesList("", "", "", 5, 1);
    getCategoriesList();
    getTagsList();
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  const goToRecipeData = () => {
    navigate("/dashboard/recipeData");
  };

  //Add to Favourites For User

  const addToFavourites = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/userRecipe",
        {
          recipeId: data,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // handleClose();
      // getCategoriesList();
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
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
            {userData?.userGroup == "SuperAdmin" ? (
              <button className="btn btn-success " onClick={goToRecipeData}>
                Add New Item
              </button>
            ) : (
              ""
            )}
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

                  {/* if logged in as superadmin see edit and delete if as systemuser see favorite */}

                  {userData?.userGroup == "SuperAdmin" ? (
                    <td>
                      <button className="btn">
                        <i
                          className="fa fa-edit"
                          //TODO:Update
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
                  ) : (
                    <td>
                      <button className="btn">
                        <i
                          className="fa fa-heart"
                          onClick={() => addToFavourites(item.id)}
                        ></i>
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </Table>

        {/* Pagination */}
        <div className="d-flex justify-content-center align-items-center mt-5">
          <Pagination>
            <Pagination.First />
            <Pagination.Prev />

            {arrayOfPages?.map((pageNo) => (
              <Pagination.Item
                key={pageNo}
                onClick={() => getRecipesList(pageNo, nameValue)}
              >
                {pageNo}
              </Pagination.Item>
            ))}

            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </div>

        {/* <div className="float-end"> 
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
</nav></div> */}
      </div>
    </>
  );
}
