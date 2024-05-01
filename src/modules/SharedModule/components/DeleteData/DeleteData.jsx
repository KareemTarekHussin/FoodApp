import React from 'react'
import noDataImg from "../../../../assets/images/no-data.png";

export default function DeleteData({deleteItem}) {
  return (
    <>
     <div className='text-center'>
        <img 
        className='resize img-fluid' 
        src={noDataImg} alt="Responsive image" />
        <h3>Delete This {deleteItem}</h3>
        <p>Are you sure you want to delete this item ? if you are sure just click on delete it</p>
        </div>
    </>
   
  )
}
