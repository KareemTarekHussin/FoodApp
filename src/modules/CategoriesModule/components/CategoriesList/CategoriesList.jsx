import React, { useState, useEffect } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import headerimg from "../../../../assets/images/header.png";
import { Table } from "react-bootstrap";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {  useForm } from "react-hook-form";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";

export default function CategoriesList() {
  

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [catId,setCatId]=useState('');
  // const [updateId, setUpdateId] = useState(null);

const [showDelete,setShowDelete] = useState(false)
const handleDeleteClose = () => setShowDelete(false);
const handleDeleteShow = (id) => {
setCatId(id)
setShowDelete(true)
}
  const [categoriesList, setCategoriesList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

                                                         //API's


//Get Categories List
const getCategoriesList = async () => {
  try {
    let response = await axios.get(
      "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    setCategoriesList(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

//Add New Category
const onSubmit = async (data) => {
  try {
    const response = await axios.post(
      "https://upskilling-egypt.com:3006/api/v1/Category",
      data,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    handleClose();
    getCategoriesList();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

//Update Item
const handleUpdateSubmit= async(data)=>{
  try {
    let response = await axios.put(
      `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
      data,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    handleClose();
    getCategoriesList();
  } catch (error) {
    console.log(error);
  }
}

//Delete Category
const handleDeleteSubmit= async() => {
  try {
    let response = await axios.delete(
      `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

  handleDeleteClose();
  getCategoriesList();
  } catch (error) {
    console.log(error);
  }

}


useEffect(() => {
  getCategoriesList()
},[]);




  
  //show list in DOM .VI.
  // useEffect(
  //   if (show && updateId){
  //     axios.get( `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
  //     {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     })
  //   getCategoriesList();}
    
  // }, []);



  return (
    <>
      <Header
        title={"Categories Item"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerimg}
      />
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <h2>Add Category</h2>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
                <form onSubmit={handleSubmit(catId ? handleUpdateSubmit : onSubmit)}>
                  <div className="input-group mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Category Name"
                      {...register("name"|| '', {
                        required: "Name is Required",
                      })}
                    />
                  </div>
                  {errors.name && (
                    <p className="alert alert-danger">{errors.name.message}</p>
                  )}

                  <button className="btn btn-success w-100 ">Save</button>
                </form>
              </Modal.Body>
            </Modal>

            <Modal show={showDelete} onHide={handleDeleteClose}>
              <Modal.Header closeButton>
              
                  <h2>Add Category</h2>
              
              </Modal.Header>
              <Modal.Body>
              <DeleteData deleteItem={"Category"}/>
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
            <h4>Categories Table Details</h4>
            <span>You can check all details</span>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <button      
              className="btn btn-success "
              onClick={handleShow}
            >
              Add New Category
            </button>
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>

              <th>Creation Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.length > 0 ? (
              categoriesList.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.creationDate}</td>
                  <td>
                    <button className="btn"
                    >
                      <i 
                      className="fa fa-edit"
                      onClick={handleShow}
                      ></i>
                
             
                
                    </button>
                    <button className="btn">
                      <i className="fa fa-trash"
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



////////Backup
// export default function CategoriesList() {
  

//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const [catId,setCatId]=useState('');

//   const [catName, setCatName] = useState('');

// const handleUpdateShow = (id)=>{
//   setCatId(id)
//   setShow(true)
// }
// const [showDelete,setShowDelete] = useState(false)
// const handleDeleteClose = () => setShowDelete(false);
// const handleDeleteShow = (id) => {
// setCatId(id)
// setShowDelete(true)
// }
//   const [categoriesList, setCategoriesList] = useState([]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//                                                          //API's


// //Get Categories List
// const getCategoriesList = async () => {
//   try {
//     let response = await axios.get(
//       "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       }
//     );

//     setCategoriesList(response.data.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// //Add New Category
// const onSubmit = async (data) => {
//   try {
//     const response = await axios.post(
//       "https://upskilling-egypt.com:3006/api/v1/Category",
//       data,
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       }
//     );
//     handleClose();
//     getCategoriesList();
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// };

// //Update Item
// const handleUpdateSubmit= async(data)=>{
//   try {
//     let response = await axios.put(
//       `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
//       data,
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       }
//     );

//     handleClose();
//     getCategoriesList();
//   } catch (error) {
//     console.log(error);
//   }
// }

// //Delete Category
// const handleDeleteSubmit= async() => {
//   try {
//     let response = await axios.delete(
//       `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       }
//     );

//   handleDeleteClose();
//   getCategoriesList();
//   } catch (error) {
//     console.log(error);
//   }

// }




// useEffect(() => {
  
//       if (show ) {
        
       
//        try{ 
//         axios.get( `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         })
//         .then(response => {
//           setCatId(response.data);
         
//         })
//         .catch(error => console.error('Error fetching item data:', error));
//     } catch (error) {
//       console.error('Error fetching item data:', error);
//     }
//   }
//   getCategoriesList()
// }, [show, catId]);
  
//   //show list in DOM .VI.
//   // useEffect(
//   //   if (show && updateId){
//   //     axios.get( `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
//   //     {
//   //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   //     })
//   //   getCategoriesList();}
    
//   // }, []);

//   // handleSubmit()=>{catId?handleUpdateSubmit:}
//   return (
//     <>
//       <Header
//         title={"Categories Item"}
//         description={
//           "You can now add your items that any user can order it from the Application and you can edit"
//         }
//         imgUrl={headerimg}
//       />
//           <Modal show={show} onHide={handleClose}>
//               <Modal.Header closeButton>
//                 <Modal.Title>
//                   <h2>Add Category</h2>
//                 </Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
              
//                 <form onSubmit={catId ? handleUpdateSubmit : onSubmit}>
//                 {/* {handleSubmit(catId ? handleUpdateSubmit : onSubmit)}> */}
                
//                   <div className="input-group mb-3 ">
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={ catName ? catName : '' } 
//                       placeholder="Category Name"
//                       {...register("name"|| '', {
//                         required: "Name is Required",
//                       })}
//                     />
//                   </div>
//                   {errors.name && (
//                     <p className="alert alert-danger">{errors.name.message}</p>
//                   )}

//                   <button className="btn btn-success w-100 ">Save</button>
//                 </form>
//               </Modal.Body>
//             </Modal>

//             <Modal show={showDelete} onHide={handleDeleteClose}>
//               <Modal.Header closeButton>
              
//                   <h2>Add Category</h2>
              
//               </Modal.Header>
//               <Modal.Body>
//               <DeleteData deleteItem={"Category"}/>
//               </Modal.Body>
//               <Modal.Footer>
          
//           <Button variant="danger" onClick={handleDeleteSubmit}>
//           Delete
//           </Button>
//         </Modal.Footer>
//             </Modal>

//       <div className="container-fluid">
//         <div className="row p-4">
//           <div className="col-md-6">
//             <h4>Categories Table Details</h4>
//             <span>You can check all details</span>
//           </div>
//           <div className="col-md-6 d-flex justify-content-end">
//             <button      
//               className="btn btn-success "
//               onClick={handleShow}
//             >
//               Add New Category
//             </button>
//           </div>
//         </div>

//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Category Name</th>

//               <th>Creation Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categoriesList.length > 0 ? (
//               categoriesList.map((item, index) => (
//                 <tr key={item.id}>
//                   <td>{index + 1}</td>
//                   <td>{item.name}</td>
//                   <td>{item.creationDate}</td>
//                   <td>
//                     <button className="btn btn-warning m-1"
//                     >
//                       <i 
//                       className="fa fa-edit "
//                       onClick={()=>{handleUpdateShow(item.id);setCatName(item.name)}}
//                       ></i>
                
             
                
//                     </button>
//                     <button className="btn btn-danger">
//                       <i className="fa fa-trash  "
//                       onClick={()=>handleDeleteShow(item.id)}
//                       ></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <NoData />
//             )}
//           </tbody>
//         </Table>
//       </div>
//     </>
//   );
// }





