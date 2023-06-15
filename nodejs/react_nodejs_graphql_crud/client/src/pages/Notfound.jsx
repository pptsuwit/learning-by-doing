import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Notfound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <FaExclamationTriangle className="text-danger" size={100} />
      <h1 className="text-danger">404</h1>
      <p className="text-danger lead">Page not found</p>
      <Link to="/" className="btn btn-danger">
        Go to home
      </Link>
    </div>
  );
}
