import React ,{ useEffect, useState,useContext}  from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../../components/navbar/navbar';
import ProductCard from '../productCart';
import CartContext from "../../context/cartContext";
import '../../App.css';
import './addtocart.css';
import {FiMinusCircle, FiPlusCircle} from "react-icons/fi";
import myImage from "../image/khalti.jpg";
import KhaltiCheckout from "khalti-checkout-web";


function Addtocart() {
    const navigate = useNavigate();
    const { cart,setCart } = useContext(CartContext);
    const [total, setTotal] = useState(0);

   
    useEffect(() => {
        var total = 0;
        cart.forEach((item) => {
          
            total += item.product.price * item.quantity;

          }
        );
        setTotal(total);
      }, [cart]);
      
  async function makeOrder() {
    try {
      var formData = new FormData();
      formData.append("token", localStorage.getItem("token"));
      formData.append("total", total + 100);
      formData.append("cart", JSON.stringify(cart));
      var response = await fetch("http://localhost/react_api/makeOrder.php", {
        method: "POST",
        body: formData,
      });

      var data = await response.json();

      if (data.success) {
        var config = {
          // replace the publicKey with yours
          publicKey: "test_public_key_5fbcd7ceb0b544e8b1f6a1a781519071",
          productIdentity: data.orderId.toString(),
          productName: `New Collection Order-${data.orderId}`,
          productUrl: "http://localhost:3000/",
          paymentPreference: ["KHALTI"],
          eventHandler: {
            async onSuccess (payload) {
              var formData = new FormData();
              formData.append("token", localStorage.getItem("token"));
              formData.append("amount", total + 100);
              formData.append("orderId", payload.product_identity);
              formData.append("status", "success");
              formData.append("otherDetails", JSON.stringify(payload));
              var response = await fetch(
                "http://localhost/react_api/makePayment.php",
                {
                  method: "POST",
                  body: formData,
                }
              );
             
              var data = await response.json();

              if (data.success) {
                toast.success(data.message);
                setCart([]);
                localStorage.removeItem("cart");
                navigate("/home");
              } else {
                toast.error(data.message);
              }


                 
                 
              },
              onError (error) {
                  console.log(error);
              },
              onClose () {
                  console.log('widget is closing');
              }
          }
      };
      let checkout = new KhaltiCheckout(config);
      checkout.show({amount: total + 100});

        // toast.success(data.message);
        // setCart([]);
        // localStorage.removeItem("cart");
        // navigate("/home");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }



  
    
    return (
      <>
      <div
      style={{
        // paddingTop: "100px",
        // paddingBottom: "100px",
      }}/>
    
      
           <Navbar cartCount  ={cart.length} />
           <div style={{"display":"flex","justifyContent":"center","alignItems":"center"}}>

           <div style={{
             display: "flex",
             flexWrap: "wrap",
                gap: "1rem",
                padding: "1rem",

            }}>
              <div>
              {" "}
          <span
            style={{
              justifyContent: "",
              display: "flex",
              fontSize: "1.5rem",
              padding: "10px",
              fontWeight: "500",
            }}
          >
            Your Cart:
          </span>
   <div className="cartBox">
            {cart.map((item) => {
              return <CartCard cartItem={item} />;
            })}
          </div>
        </div>
        </div>
      <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px 10px",
            fontSize: "1.25rem",
          }}
          >
          <div className="summaryBoard">
            {" "}
            <span className="title">Order Summary:</span>
            <div className="head">
              <span className="subtitle">SubTotal:</span>
              <span className="value">Rs.{total}</span>
            </div>
            <div className="head">
              <span className="subtitle">Delivery Charge:</span>
              <span className="value">Rs.{100}</span>
            </div>
            <div className="head">
              {" "}
              <span className="subtitle">Grand Total:</span>
              <span className="value">Rs.{total + 100}</span>
            </div>
            <div onClick={makeOrder} className="pay">
              <span>Pay with</span>
              
                < img src={myImage}  style={{
                  height: "50px",
                  width: "100px",}}/>
              
            </div>
          </div>
                  </div>
        </div>
      
  
  
  
          </>
      )
  }
  

export default Addtocart;

function CartCard({cartItem}) {
    const {product, quantity} = cartItem;
    const {cart, setCart} = useContext(CartContext);
    console.log(product);
    return (
      <div className="cartCard">
        <img
          src={"http://localhost/react_api/" + product.image_url}
          style={{width: "200px", height: "100px", objectFit: "cover"}}
        />
        <div className="infoBox">
          <p>{product.title}</p>
          <p>Rs. {product.price}</p>
        </div>
        <div className="btnBox">
          <FiMinusCircle
            style={{color: "red", cursor: "pointer"}}
            onClick={() => {
              var newCart = cart;
              newCart.forEach((item) => {
                if (item.product.product_id === product.product_id) {
                  if (item.quantity === 1) {
                    toast.error("Quantity cannot be less than 1");
                  } else {
                    item.quantity = item.quantity - 1;
                    setCart([...newCart]);
                    localStorage.setItem("cart", JSON.stringify(newCart));
                    return;
                  }
                }
              });
            }}
            size={30}
          />
          <span>{quantity}</span>
          <FiPlusCircle
            style={{color: "green", cursor: "pointer"}}
            size={30}
            onClick={() => {
              var newCart = cart;
              newCart.forEach((item) => {
                if (item.product.product_id === product.product_id) {
                  if (item.quantity === 10) {
                    toast.error("Quantity cannot be more than 10");
                  } else {
                    item.quantity = item.quantity + 1;
                    setCart([...newCart]);
                    localStorage.setItem("cart", JSON.stringify(newCart));
                    return;
                  }
                }
              });
            }}
          />
        </div>
      </div>
    );
  }
  
