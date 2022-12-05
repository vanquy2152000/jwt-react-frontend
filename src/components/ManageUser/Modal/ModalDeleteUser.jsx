import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalDeleteUser = (props) => {
  const { show, handleCloseModal, dataModal, handleConfirmDeleteUser } = props;
  return (
    <>
      <Modal show={show} onHide={handleCloseModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure want to delete <b>{dataModal.email}</b> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmDeleteUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
