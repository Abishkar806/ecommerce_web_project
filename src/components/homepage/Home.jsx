import React from "react";
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../../components/navbar/navbar';
// import MyButton from '../../components/mybutton';
import ProductCard from '../productCart';
import '../../App.css';


function Homepage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cartNumber, setCartNumber] = useState(0);

  const [count, setCount] = useState(0);
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect( () => {
    const loadProducts=async ()=>{

        const formData= new FormData();
        formData.append("categoryId",1);
        var response = await fetch('http://localhost/react_api/getProducts.php', {
            method: 'POST',
            body:formData,
    
        });
        var data = await response.json();
        if (data.success) {
            setProducts(data.products);
        } else {
            toast.error(data.message);
        }
    }
    loadProducts();
   
}, []);
  return (
    <>
    <Navbar cartCount={cartNumber} />
    <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                padding: "1rem",

            }}>
                {
                    products.map((product) => {
                        return (
                            <ProductCard product={product}  key={product.product_id} />

                        )
                    })
                }
            </div>



        </>
    )
}

export default Homepage