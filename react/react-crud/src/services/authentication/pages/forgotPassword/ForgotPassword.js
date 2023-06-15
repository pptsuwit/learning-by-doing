import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../../utility/Axios";
import { Services } from "../../../utility/Utility";
class ForgotPassword extends Component {
  componentDidMount() {}
  onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/forgotpassword", {
        email: e.target.email.value,
      })
      .then((res) => {
        this.setState({ redirect: Services.response(res) });
      })
      .catch((error) => {
        Services.error(error);
      });
  };
  render() {
    return (
      <div className="center-login gray-bg">
        <div className="login animated fadeInDown ">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center logo-name">Bullet</h1>
            </div>
            <div className="col-12 text-center">
              <h1 className="font-bold">Forgot password</h1>
            </div>
            <div className="col-6 mx-auto text-center">
              <p>
                Enter your email address and your password will be reset and
                emailed to you.
              </p>
            </div>
            <div className="col-12">
              <form className="m-t" id="form" onSubmit={this.onSubmit}>
                <div className="form-group col-6 mx-auto">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                    name="email"
                    required=""
                  />
                </div>
                <div className="form-group col-6 mx-auto">
                  <button
                    type="submit"
                    className="btn btn-primary block full-width m-b"
                  >
                    Send new password
                  </button>
                </div>
                <div className="form-group col-6 mx-auto text-right">
                  <div>
                    <Link to="/">Go to login</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
