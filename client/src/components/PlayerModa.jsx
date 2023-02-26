import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PlayerDetailsModal = ({ selectedNode, handleClose }) => {
  return (
    <Modal show={selectedNode !== null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedNode && selectedNode.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Player details:</p>
        {selectedNode && (
          <ul>
            <li>Name: {selectedNode.name}</li>
            <li>Age: {selectedNode.age}</li>
            <li>Position: {selectedNode.position}</li>
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlayerDetailsModal;
