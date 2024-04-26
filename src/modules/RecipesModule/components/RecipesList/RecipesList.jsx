import React from 'react'
import Header from '../../../SharedModule/components/Header/Header';
import headerimg from "../../../../assets/images/home-avatar.svg";

export default function RecipesList() {
  return (
    <>
  <Header title={"Welcome Upskilling!"} 
  description={"This is a welcoming screen for the entry of the application , you can now see the options" } 
  imgUrl={headerimg}/>
  
  
  </>
  )
}
