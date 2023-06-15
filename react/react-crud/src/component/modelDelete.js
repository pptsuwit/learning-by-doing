import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";

function ModalDelete(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };
  const handleSave = () => {
    setShow(false);

    axios
      .delete("https://mysterious-bayou-37893.herokuapp.com/users/delete", {
        data: { id: props.id },
      })
      .then((response) => {
        console.log(response);
        props.setReload(response);
      });
  };
  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ต้องการลบข้อมูลใช่หรือไม่ ?</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body></Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ไม่ใช่
          </Button>
          <Button variant="primary" onClick={handleSave}>
            ใช่
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDelete;
