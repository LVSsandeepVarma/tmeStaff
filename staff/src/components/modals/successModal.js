import { useState } from 'react';
import { Modal, Card } from 'react-bootstrap';
import { BsCheckCircle } from 'react-icons/bs';

function SuccessModal(props) {
    const show = props.show

    const setShowSuccessModal = props.setShowSuccessModal

    const handleClose = () => setShowSuccessModal(false);

  return (
    <Modal show={show} onHide={handleClose} size='sm' centered>
      <Modal.Body className='flex flex-col	 items-center'>
        {/* <Card>
          <Card.Body className="text-center"> */}
            <BsCheckCircle size={60} color="green"  className="flex w-[100%]"/>
            <p className='test-center text-lg'>Enquiry successful!</p>
          {/* </Card.Body>
        </Card> */}
      </Modal.Body>
    </Modal>
  );
}

export default SuccessModal;
