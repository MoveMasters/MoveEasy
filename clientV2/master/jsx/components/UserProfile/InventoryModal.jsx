import React, { Component } from 'react';
import { Modal, Button, Col, Row } from 'react-bootstrap';
import EditInventory from './EditInventory';

const InventoryModal = (props) => (
  <Modal 
    show={props.show} 
    onHide={props.onHide} 
    bsSize="large" 
    aria-labelledby="contained-modal-title-lg">
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <Col md={6} >
            <img src={ props.modalItem.url } alt="" className="img-thumbnail img-responsive" />
        </Col>

        <Col md={6}>
          <EditInventory 
          modalItem={props.modalItem}
          handleModal={props.handleModal}/>
        </Col>
      </Row>
    </Modal.Body>
  </Modal>
);

export default InventoryModal;