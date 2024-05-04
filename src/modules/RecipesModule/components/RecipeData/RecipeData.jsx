import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RecipesListHeader from "../../../SharedModule/components/RecipesListHeader/RecipesListHeader";

export default function RecipeData() {
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);

  const getTagsList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data);
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
  const appendToFormData=(data)=>{
    const formData= new FormData();
    formData.append('name',data.name);
    formData.append('price',data.price);
    formData.append('description',data.description);
    formData.append('categoriesIds',data.categoriesIds);
    formData.append('tagId',data.tagId);
    formData.append('recipeImage',data.recipeImage[0]);
    return formData;
  }

  const onSubmit = async (data) => {
   let recipeFormData= appendToFormData(data);
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Recipe",
        recipeFormData  ,   //Bab3at Form Data 
        {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
toast.success("Recipe Created Sucessfully");
navigate('/dashboard/recipes');
    } catch (error) {
 toast.error("Failed to create Recipe")
    }
  };

  useEffect(() => {
    getCategoriesList();
    getTagsList();
  }, []);
  return (
    <>
    <RecipesListHeader title={"All"}/>
    <div className="p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-1">
          <input
            type="text"
            className="form-control"
            placeholder="Recipe Name"
            {...register("name", {
              required: "Name is required",
            })}
          />
        </div>
        {errors.name && (
          <p className="alert alert-danger p-1">{errors.name.message}</p>
        )}
  <div className="input-group mb-1">
          <select
            className="form-control"
            {...register("tagId", {
              required: "A Tag is required",
              pattern: {
                message: "Invalid Tag",
              },
            })}
          >
            <option>Tag</option>
            {tagsList.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        {errors.tagId && (
          <p className="alert alert-danger p-1">{errors.tagId.message}</p>
        )}

        <div className="input-group mb-1">
          <input
            type="price"
            className="form-control"
            placeholder="Price"
            {...register("price", {
              required: "Price is required",
              pattern: {
                message: "Invalid Mail",
              },
            })}
          />
        </div>
        {errors.price && (
          <p className="alert alert-danger p-1">{errors.price.message}</p>
        )}

        <div className="input-group mb-1">
          <select
            className="form-control"
            {...register("categoriesIds", {
              required: "A Categorie is required",
              pattern: {
                message: "Invalid Categorie",
              },
            })}
          >
              <option>Categorie</option>
            {categoriesList.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {errors.categoriesIds && (
          <p className="alert alert-danger p-1">
            {errors.categoriesIds.message}
          </p>
        )}
        <div className="input-group mb-1">
          <textarea
            cols="30"
            rows="4"
            placeholder="Description"
            className="form-control"
            {...register("description", {
              required: "Description is required",
            })}
          />
        </div>
        {errors.description && (
          <p className="alert alert-danger p-1">{errors.description.message}</p>
        )}

         <div className="input-group mb-1">
          <input
            type="file"
            className="form-control"
            placeholder="Price"
            {...register("recipeImage", {
              required: "Image is required",
              pattern: {
                message: "Invalid Image",
              },
            })}
          />
        </div>
        {errors.recipeImage && (
          <p className="alert alert-danger p-1">{errors.recipeImage.message}</p>
        )}
        <button className=" float-end btn btn-success ">Save</button>
      </form>
    </div></>
  );
}
