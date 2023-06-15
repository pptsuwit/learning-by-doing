import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

export default function EditPorjectModal(props) {
  const [name, setName] = useState(props.project.name);
  const [description, setDescription] = useState(props.project.description);
  const [clientId, setClientId] = useState(props.project.client.id);
  const [status, setStatus] = useState(props.project.status);

  const { loading, error, data } = useQuery(GET_CLIENTS);
  const id = props.project.id;

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id, name, description, status, clientId },
    update(cache, { data: { updateProject } }) {},
    onCompleted: (data) => {
      props.setProject(data.updateProject);
    },
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || clientId === "") {
      return;
    }
    updateProject(name, description, status, clientId);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Somthing Went Wrong</p>;

  return (
    <>
      <div className="d-flex  ms-auto">
        <button
          type="button"
          className="btn btn-secondary px-3"
          data-bs-toggle="modal"
          data-bs-target="#editProjectModal"
        >
          <div className="d-flex align-items-center">
            <FaEdit className="icon"></FaEdit>
            <div>Edit Project</div>
          </div>
        </button>
        <div
          className="modal fade"
          id="editProjectModal"
          tabIndex="-1"
          aria-labelledby="editProjectModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editProjectModalLabel">
                  Add Client
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      id="status"
                      className="form-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Client
                      </option>
                      <option value="new">Not Started</option>
                      <option value="progress">In Progress</option>
                      <option value="complete">Completed</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Client</label>
                    <select
                      id="clientId"
                      className="form-select"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Client
                      </option>
                      {data.clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    data-bs-dismiss="modal"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
