import React, { Component } from 'react';
import { Modal, Button, Col, Row } from 'react-bootstrap';
import UpdateInventory from './UpdateInventory';

const InventoryModal = (props) => (
  <Modal 
    show={props.show} 
    onHide={props.onHide} 
    bsSize="large" 
    aria-labelledby="contained-modal-title-lg">
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-lg">{props.clientName}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <Col md={6} >
            <img src={ props.modalItem.url } alt="" className="img-thumbnail img-responsive" />
        </Col>

        <Col md={6}>
          <UpdateInventory 
          modalItem={props.modalItem}
          handleModal={props.handleModal}
          updateInventory={props.updateInventory}/>
        </Col>
      </Row>
    </Modal.Body>
  </Modal>
);

export default InventoryModal;