import axios from "axios";
import React, { useEffect, useState } from "react";

// import { Table, Button } from "react-bootstrap";
import ModalComponent from "./modal";
import ModalEditComponent from "./modalEdit";
import ModalDelete from "./modelDelete";
const TableComponent = () => {
  const [reload, setReload] = useState({});
  const getApi = () =>
    axios.get("https://mysterious-bayou-37893.herokuapp.com/users");
  const [dataTable, setTable] = useState(<></>);
  useEffect(() => {
    getApi().then((response) => {
      const data = response.data;
      const dataTable = data.map((item) => {
        return (
          <>
            <tr>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.fname}</td>
              <td>{item.lname}</td>
              <td>{item.email}</td>
              <td>
                <ModalEditComponent
                  setReload={setReload}
                  users={item}
                ></ModalEditComponent>
                <ModalDelete setReload={setReload} id={item.id}></ModalDelete>
              </td>
            </tr>
          </>
        );
      });
      setTable(dataTable);
    });
  }, [reload]);

  return (
    <div>
      <ModalComponent setReload={setReload}></ModalComponent>
      <table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th className="text-center">Email</th>
          </tr>
        </thead>
        <tbody>{dataTable}</tbody>
      </table>
    </div>
  );
};
export default TableComponent;
