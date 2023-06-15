import { DELETE_PROJECT } from "../mutations/projectMutations";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
export default function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  return (
    <div className="d-flex mt-2 ms-auto">
      <button
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#confirmDeleteModal"
      >
        <FaTrash className="icon" /> Delete Project
      </button>
      <div
        className="modal fade"
        id="confirmDeleteModal"
        tabIndex="-1"
        aria-labelledby="confirmDeleteModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" id="confirmDeleteModal">
                Remove Project
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5>Are you sure you want to delete this client?</h5>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={deleteProject}
                data-bs-dismiss="modal"
              >
                Submit
              </button>
              <button className="btn btn-danger" data-bs-dismiss="modal">
                Cancle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
