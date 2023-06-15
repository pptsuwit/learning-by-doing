import React from "react";
import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";
import Clients from "../components/Clients";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal></AddClientModal>
        <AddProjectModal></AddProjectModal>
      </div>
      <Projects></Projects>
      <hr />
      <Clients></Clients>
    </>
  );
}
