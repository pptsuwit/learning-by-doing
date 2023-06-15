import React, { useEffect, useState } from "react";
// import { Modal, Button } from "react-bootstrap";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";

function ModalComponent(props) {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setFName("");
    setLName("");
    setUsername("");
    setEmail("");
  };
  const handleSave = () => {
    setShow(false);
    const user = {
      username: username,
      fname: fname,
      lname: lname,
      email: email,
      avatar: "-",
    };
    axios
      .post("https://mysterious-bayou-37893.herokuapp.com/users/create", user)
      .then((response) => {
        props.setReload(response);
      });
  };

  return (
    <div className="my-2">
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>

      <Modal open={show} onClose={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              aria-label="First Name"
              aria-describedby="basic-addon1"
              onChange={(e) => setFName(e.target.value)}
            ></input>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              aria-label="Last Name"
              aria-describedby="basic-addon1"
              onChange={(e) => setLName(e.target.value)}
            ></input>
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ModalComponent;
