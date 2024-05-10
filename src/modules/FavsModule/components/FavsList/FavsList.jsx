import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import headerimg from "../../../../assets/images/header.png";
import NoData from "../../../SharedModule/components/NoData/NoData";
import noDataImg from "../../../../assets/images/no-data.png";
import axios from "axios";

export default function FavsList() {
  const [favsList, setFavsList] = useState([]);

  const getFavsList = async () => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // console.log(response.data);

      setFavsList(response.data.data);
      console.log("recipeDAta",response.data.data);
    } catch (error) {}
  };

  const handleDeleteFavourite = async (recipeId) => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe/${recipeId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      
     getFavsList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavsList();
  }, []);

  return (
    <>
      <Header
        title={"Favourites Item"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerimg}
      />

      <div className="filteration my-3 container-fluid p-3">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search Here..."
              className="form-control "
              // onChange={getNameValue}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control text-muted"
              // onChange={getTagValue}
            >
              <option value="" className="text-muted">
                Category
              </option>
              {/* {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))} */}
            </select>
          </div>
          <div className="col-md-3 ">
            <select
              className="form-control text-muted"
              // onChange={getCatValue}
            >
              <option value="" className="text-muted">
                Tag
              </option>
              {/* {tagsList.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))} */}
            </select>
          </div>
        </div>
      </div>
     
        {favsList.length > 0 ? (
          favsList.map((item, index) => (
            <div className="my-3 container-fluid p-5">
            <div key={item?.recipe?.id} className="row row-cols-1 row-cols-md-3 g-3">
              <div className="col">
                <div className="card h-100">
                  {item?.recipe?.imagePath ? (
                    <img
                      className="smallImg card-img-top img-fluid rounded"
                      src={
                        "https://upskilling-egypt.com:3006/" + item?.recipe?.imagePath
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
                  <div className="card-body d-flex justify-content-between">
                    <div>
                    <h5 className="card-title">{item?.recipe?.name}</h5>
                    <p className="card-text">{item?.recipe?.description}</p>
                    </div>
                    <div>
                    <button className="btn">
                      <i
                        className="fa fa-heart"                       
                        onClick={()=>handleDeleteFavourite(item.id)}
                      ></i>

                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          ))
        ) : (
          <NoData />
        )}
    
    </>
  );
}
