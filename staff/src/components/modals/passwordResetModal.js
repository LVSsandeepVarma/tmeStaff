"use client"
import React, { useState, useEffect } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
// import { useRouter } from 'next/navigation';
import { Navigate, useNavigate } from 'react-router-dom';

const TimedModal = ({ show, handleClose }) => {
    const navigate = useNavigate()
  const [progress, setProgress] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          handleClose();
          return 0;
        }
        return prevProgress + 10;
      });
    }, 1000);

    return () => {
        
      clearInterval(timer);
      
    };
    
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Password Reset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {progress < 100 ? (
          <>
            <p>Resetting password...</p>
            <ProgressBar animated now={progress} />
          </>
        ) : (
          <p>Password reset successful!</p>
          
        )}
        <Navigate to={"/login"} />
      </Modal.Body>
    </Modal>
  );
};

export default TimedModal;
