import React,{ useContext, useState }  from "react";
import "./navbar.css";
import {   useNavigate } from 'react-router-dom';
import {FaCartShopping} from "react-icons/fa6";
import {MdLogout} from "react-icons/md";
import CartContext from "../../context/cartContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// import MyButton from "../mybutton";
function Navbar() {
  const {cart} = useContext(CartContext);
  const [isLogoutModal, setLogoutModal]=useState(false);
  const [productdesc,setproductshow]=useState(false);
  console.log(cart);
  const navigate = useNavigate();
  // console.log(name);

  const scrollTop = () => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Add smooth scrolling behavior
    });

    // Navigate to the "/Home" route after scrolling to the top
    navigate("/Home");
  };

const onClose=()=>{
  setLogoutModal(false);
}

  return (<>
  
  <Modal show={isLogoutModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            onClose();
              localStorage.removeItem("token");
              navigate("/login");

          }}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={productdesc} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Description</Modal.Title>
        </Modal.Header>
        <Modal.Body> </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            onClose();
              localStorage.removeItem("token");
              navigate("/home");

          }}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    <div className="navHead ">
      <div className="logo"   onClick={scrollTop } >New Collection  </div>
      <div className="catHead">
        <span className="cat">Jents</span>
        <span className="cat">Ladies</span>
        <span className="cat">Kids</span>
      </div>
      
      <div className="iconHead">
       
          {" "}
          <div>
      <span className="dog"onClick={() => {
      navigate("/addproduct")}}>Add Product</span>
       
      </div>
      
      <div>
          <FaCartShopping size={25} onClick={() =>{navigate("/Addtocart")}}/>
          <span className="cartCount" >{cart.length}</span>
          
        </div>

        <MdLogout
          size={22}
          onClick={() => {
          setLogoutModal(true);
            // window.location.href = "/login";
          }}
        />
      </div>
    </div>
    </>
  );
}

export default Navbar;
