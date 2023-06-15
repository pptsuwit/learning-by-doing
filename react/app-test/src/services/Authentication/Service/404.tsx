import React, { useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { authenticationService } from "../Service/authentication.service";
// interface Notfound404 extends RouteComponentProps<any> {
//   /* other props for ChildComponent */
// }
// import { Redirect } from "react-router-dom";

const Notfound404: React.FC = () => {
  let history = useHistory();
  useEffect(() => {
    if (!authenticationService.currentUserValue) {
      history.push("/login"); //return to login
    }
  }, [history]);

  var redirect_to; // default 404
  if (!authenticationService.currentUserValue) {
    // redirect_to = <Redirect to='/' />
  }
  return (
    <div className="middle-box text-center animated fadeInDown">
      {redirect_to}
      <h1>404</h1>
      <h3 className="font-bold">Page Not Found</h3>

      <div className="error-desc">
        Sorry, but the page you are looking for has note been found. Try
        checking the URL for error, then hit the refresh button on your browser
        or try found something else in our app.
      </div>
    </div>
  );
};
export default Notfound404;
