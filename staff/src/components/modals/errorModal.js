"use client"
import React, { useState, useEffect } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
// import { useRouter } from 'next/navigation';
import { Navigate, useNavigate } from 'react-router-dom';

const ErrorTimedModal = ({ show, handleClose }) => {
    const navigate = useNavigate()
  const [progress, setProgress] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      handleClose()
    }, 3000);

    return () => {
        
      clearInterval(timer);
      
    };
    
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Internal Server</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <p>Something went wrong please Login again!</p>
        <Navigate to={"/login"} />
      </Modal.Body>
    </Modal>
  );
};

export default ErrorTimedModal;
