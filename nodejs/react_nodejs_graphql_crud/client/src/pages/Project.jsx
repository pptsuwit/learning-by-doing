import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditPorjectModal from "../components/EditProjectModal";
import { useState } from "react";
export default function Project() {
  const [project, setProject] = useState(null);
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
    onCompleted: (data) => {
      setProject(data.project);
    },
  });
  if (loading) return <Spinner />;
  if (error) return <p>Somthing Went Wrong</p>;
  if (!data) return null;
  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-100 card p-5">
          <EditPorjectModal
            setProject={setProject}
            project={project}
          ></EditPorjectModal>

          <DeleteProjectButton projectId={project.id}></DeleteProjectButton>
          <h1 className="text-center">{project.name}</h1>
          <p className="lead">{project.description}</p>
          <h5 className="mt-3">{project.status}</h5>
          <hr />
          <ClientInfo client={project.client}></ClientInfo>

          <div className="text-center mt-5">
            <Link
              to="/"
              className="btn btn-dark btn-sm w-25 align-content-center py-2"
            >
              Back
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
