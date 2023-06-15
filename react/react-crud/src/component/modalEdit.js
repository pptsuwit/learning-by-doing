import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";

function ModalEditComponent(props) {
  const user = props.users;
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [fname, setFName] = useState(user.fname);
  const [lname, setLName] = useState(user.lname);
  const [email, setEmail] = useState(user.email);
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
    const user_edit = {
      id: user.id,
      username: username,
      fname: fname,
      lname: lname,
      email: email,
      avatar: "-",
    };
    console.log(user_edit);
    axios
      .put(
        "https://mysterious-bayou-37893.herokuapp.com/users/update",
        user_edit
      )
      .then((response) => {
        console.log(response);
        props.setReload(response);
      });
  };
  return (
    <div className="my-2">
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={username}
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
              value={fname}
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
              value={lname}
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
              value={email}
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
export default ModalEditComponent;
