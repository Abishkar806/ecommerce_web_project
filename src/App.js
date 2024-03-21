/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage/Home';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Addproduct from './components/addproduct/addproduct';
import "./index.css";
import "./App.css";
import { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import CartContext from './context/cartContext';
import Addtocart from './components/addtocart/addtocart';

import Kidspage from './components/kids/kids';



 // Adjust the path based on your project structure

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [cart,setCart] = useState(JSON.parse(localStorage.getItem("cart")) ?? []);



  useEffect(() => {
    if (token === null) {
      navigate("/login");
      // window.location.href = "/login"
    // } else {
    //   navigate("/Home");
    //   // window.location.href = "/home"
    }
  }, []);

  return (
    <> 
  <CartContext.Provider value={{cart , setCart}}>
  <Toaster/>
    <Routes>
    <Route path="/" element={<Homepage/>} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Signup" element={<Signup />} />
    <Route path="/Home" element={<Homepage/>}/>
    <Route path="/addproduct" element={<Addproduct/>}/>
    <Route path="/addtocart" element={<Addtocart/>}/>
    <Route path="/kids" element={<Kidspage/>}/>


    


   
  <Route path="*" element={<Login />} />
 </Routes>
  </CartContext.Provider>
  
</>
   
  

  );
}

export default App;



