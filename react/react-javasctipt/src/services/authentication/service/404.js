import React, { Component } from "react";
import { authenticationService } from "../service/Authentication.service";
class Notfound404 extends Component {
  constructor(props) {
    super(props);
    // if (props.location.pathname === "/") {
    //     this.props.history.push('/login'); //return to login
    // }
    if (!authenticationService.currentUserValue) {
      this.props.history.push("/login"); //return to login
    }
  }

  componentDidMount = () => {
    // console.log("Not Found");
  };

  render() {
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
          checking the URL for error, then hit the refresh button on your
          browser or try found something else in our app.
        </div>
      </div>
    );
  }
}
export default Notfound404;
