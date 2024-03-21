
import React ,{ useContext }from 'react';
import MyButton from './mybutton'
import CartContext from '../context/cartContext';

import toast from 'react-hot-toast';

function ProductCard({ product }) {
    const { cart, setCart } = useContext(CartContext);
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "85vh",
            gap: "1rem",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <img src={"http://localhost/react_api/" + product.image_url} style={{ "width": "200px", "height": "200px", "objectFit": "cover" }} />
                <h1>{product.title}</h1>
                <span style={{width:"150px",fontSize:"15px", overflow:"hidden","maxLines":3}}>{product.description} </span>
                <h3>Rs. {product.price}</h3>
                <MyButton title={"Add to Cart"} onClick={() => {
                    var alreadyInCart = false;
                    cart.forEach((item) => {
                        if (item.product_id === product.product_id) {
                            alreadyInCart = true;
                        }
                    })

                    if (alreadyInCart) {
                        toast.error("Product already in cart")
                    } else {

                        setCart([...cart,{product,quantity:1}])
                        localStorage.setItem("cart", JSON.stringify([...cart,{product,quantity:1}]))
                        toast.success("Product added to cart")

                    }

                }} /> 
            </div>
        </div>
    )
}

export default ProductCard