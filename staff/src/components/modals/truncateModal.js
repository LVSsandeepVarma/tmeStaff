import { Modal, Button } from 'react-bootstrap';

import React from 'react'

export default function TruncateModal(props) {
    console.log(props)
    const showModal = props?.show;
    const handleCloseModal = props?.handleCloseTruncateModal;
    const data= props?.data
  return (
    <>
      {/* <div className='modal-backdrop'></div> */}
        <Modal   show={showModal} onHide={handleCloseModal} className='flex items-start !top-[40px] z-2000 bg-[rgba(0,0,0,0.5)]' backdrop="static">
            <Modal.Header closeButton>
            <Modal.Title>Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body className='!max-h-[269px] overflow-y-scroll'>
            <p>{data}</p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{handleCloseModal()}}>
                Close
            </Button>
            </Modal.Footer>
      </Modal>
    </>
  )
}
