import React, { Component } from "react";
import { Link } from "react-router-dom";
class Notfound404 extends Component {
  render() {
    return (
      <div>
        <h1>404</h1>
        <h3 className="font-bold">Page Not Found</h3>
        <div className="error-desc">
          Sorry, but the page you are looking for has note been found. Try
          checking the URL for error, then hit the refresh button on your
          browser or try found something else in our app.
        </div>

        <Link to="/">Redirect to Login</Link>
      </div>
    );
  }
}
export default Notfound404;
