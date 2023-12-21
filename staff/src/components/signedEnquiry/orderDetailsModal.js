import React from 'react';
import { Modal, Row, Col, Table } from 'react-bootstrap';
// import 'tailwindcss/tailwind.css';

const MyModal = ({ showModal, handleClose, clientId }) => {
    console.log(clientId)
  return (
    <Modal size='xl' show={showModal} onHide={handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col sm={4}>
            <span><b>Name</b>: John Doe</span>
          </Col>
          <Col sm={4}>
            <span><b>Email</b>: john@example.com</span>
          </Col>
          <Col sm={4}>
            <span><b>Phone</b>: 123-456-7890</span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm={6}>
            <span><b>Billing Address</b>: 123 Billing St, City, Country</span>
          </Col>
          <Col sm={6}>
            <span><b>Shipping Address</b>: 456 Shipping St, City, Country</span>
          </Col>
        </Row>
        <Table className="mt-3" responsive bordered>
          <thead>
          <tr>
            <th>Order id</th>
            <th>Phone</th>
            <th>Products</th>
            <th>Purchased Date </th>
            <th>Price</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1</td>
              <td>Row 1</td>
              <td>Row 1</td>
              <td>Row 1</td>
              <td>Row 1</td>
            </tr>
            <tr>
              <td>Row 2</td>
              <td>Row 2</td>
              <td>Row 2</td>
              <td>Row 2</td>
              <td>Row 2</td>
            </tr>
            <tr>
              <td>Row 3</td>
              <td>Row 3</td>
              <td>Row 3</td>
              <td>Row 3</td>
              <td>Row 3</td>
            </tr>
            {/* Additional rows go here */}
          </tbody>
        </Table>
        <Row className='text-lg font-bold'>
            Summary
        </Row>
        <Row className="mt-3">
          <Col sm={6}>
            <span className='text-orange-600'><b>Subtotal</b>: $100.00</span>
          </Col>
          <Col sm={6}>
            <span className='text-green-800'><b>Discount</b>: $10.00</span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm={6}>
            <span className='text-red-500' ><b>Tax</b>: $5.00</span>
          </Col>
          <Col sm={6}>
            <span className='text-lg text-blue-800 font-bold'>Total: $95.00</span>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
