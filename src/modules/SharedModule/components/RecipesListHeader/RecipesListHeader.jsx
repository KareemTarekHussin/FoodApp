import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RecipesListHeader({title}) {
const navigate =useNavigate()
    const goToRecipeList=()=>{
        navigate('/dashboard/recipes')
      }


  return (
    <div className='recipeheader-container container m-4 p-5'>
        <div className="row">
            <div className="col-md-6">
            <h4>Fill the <span>Recipes</span>&nbsp;!</h4>
            <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
            </div>
            <div className="col-md-6">
           <button onClick={goToRecipeList} className='btn bg-success text-white float-end w-50'>
            {title} Recipes &nbsp;
            <i className='fa fa-arrow-right'></i>
            </button>
            </div>

            </div>
    </div>
  )
}
