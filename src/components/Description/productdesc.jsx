import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Productdesc() {
  return (
    <div><>
      <Modal show={isLogoutModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
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
    </>
    </div>
  )
}

export default Productdesc
