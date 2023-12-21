import { useState } from 'react';
import { Modal, Card } from 'react-bootstrap';
import { BsCheckCircle } from 'react-icons/bs';
import {RiCloseCircleLine} from "react-icons/ri"

function EmailVerificationModal(props) {
    const show = props.show;
    const res = props.response
    const setShowEmailVerifyModal = props.setShowEmailVerifyModal
console.log(res)
    const handleClose = () => setShowEmailVerifyModal(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>Email Verification Status</Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body className="text-center flex flex-col items-center">
            {res?.status && <BsCheckCircle size={50} color="green" />}
            {!res?.status &&
            <RiCloseCircleLine size={70} color="red" />}
            <p>{res?.message}</p>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

export default EmailVerificationModal;
