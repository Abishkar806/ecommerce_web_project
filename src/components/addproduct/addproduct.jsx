import React, { useState } from 'react';
import '../../App.css';
import './addproducts.css';
import Navbar from '../navbar/navbar';


import {  useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {toast} from 'react-hot-toast';




function Addproduct() {
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [category_id, setcategory_id] = useState("");
  const [image, setimage] = useState();
  


  

  const onSubmit = async (e) => {
      e.preventDefault();
      try {
          var formData = new FormData();
          formData.append("title", title); 
          formData.append("price", price);
          formData.append("description", description);
          formData.append("category_id", category_id);
          formData.append("image", image);




          var response = await fetch('http://localhost/react_api/addProduct.php', {
              method: 'POST',
              body: formData,
          });

          var result = await response.json();

          if(result.success){
              toast.success(result.message);
              localStorage.setItem("token", result.token);
              navigate("/Home");

          }else{
              toast.error(result.message);
          }

          

      } catch (error) {
          console.log(error)
      }
  }

  return (<>
    <Navbar/>
      <div className='addproductContainer'>
      <form onSubmit={onSubmit}>
          <div className='container-heading'>
          <div className='container'>
              <div className='header'>
                  <div className='text'></div>
                  <div className='title'>AddProduct</div>
                  <div className='underline'></div>
              </div>
              
              <div className='inputs'>
                  
   
                   
                  <input  onChange={(v) => { settitle(v.target.value) }} required value={title} placeholder='Enter Product Title ' type='text' className='input'></input>
                  <input  onChange={(v) => { setprice(v.target.value) }} value={price} required placeholder='Enter Product Price' type='text' className='input'></input>
                  <input  onChange={(v) => { setdescription(v.target.value) }} required value={description} placeholder='Enter Product Description' type='text' className='input'></input>
                  <input  onChange={(v) => { setcategory_id(v.target.value) }} required value={category_id} placeholder='Enter Product Category ID' type='text' className='input'></input>
                  <input  onChange={(e) => { if (e.target.files && e.target.files[0]) { setimage((e.target.files[0]) )}}} required file={image}  placeholder='Upload your image' type='file' className='input'></input>

                 

          
              </div>

               
                  
              
              <div style={{
          "display":"flex",
          "gap":"10px"}}>
              <Button type='submit' className='button'>Submit</Button>
               
              </div>
              
              
          </div>
          </div>
          
      </form>
      </div>
      </>
  );
}



export default Addproduct;
