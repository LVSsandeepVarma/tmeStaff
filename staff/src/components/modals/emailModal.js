import { useState } from 'react';
import { Modal, Card } from 'react-bootstrap';
import { BsCheckCircle } from 'react-icons/bs';

function EmailModal(props) {
    const show = props.show
    
    const setShowSuccessModal = props.setShowSuccessModal

    const handleClose = () => setShowSuccessModal(false);

  return (
    <Modal size='sm' show={show} onHide={handleClose}  centered>
      <Modal.Body className='flex flex-col	 items-center'>
            <BsCheckCircle size={60} color="green"  className="flex w-[100%]" />
            <p className='mt-2 text-center text-lg'>Link successfully sent tot your registered email!</p>
      </Modal.Body>
    </Modal>
  );
}

export default EmailModal;
