import React from 'react'
import noDataImg from "../../../../assets/images/no-data.png";
import "./NoData.css"


export default function NoData() {
  return (
    <div className='text-center'>
        <img 
        className='resize img-fluid' 
        src={noDataImg} 
        alt="Responsive image"
         />
        <h3>No Data !</h3>
        <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
        </div>
  )
}
