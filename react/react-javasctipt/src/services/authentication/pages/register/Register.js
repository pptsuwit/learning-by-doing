import React, { Component } from "react";
import { Link } from "react-router-dom";
const $ = window.$;
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    $(document).ready(function () {
      $("#form").validate({
        rules: {
          password: {
            required: true,
            minlength: 3,
          },
          url: {
            required: true,
            url: true,
          },
          number: {
            required: true,
            number: true,
          },
          min: {
            required: true,
            minlength: 6,
          },
          max: {
            required: true,
            maxlength: 4,
          },
        },
      });
    });
  }
  handleSubmit(event) {
    console.log("Submit", event.target.value);
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col align-self-center">
            <div className="gray-bg ibox-content loginscreen animated fadeInDown">
              <div>
                <div className="text-center">
                  <p className="h1">INCOZE</p>
                </div>
                <h3 className="text-center">Register to INCOZE</h3>
                <p className="text-center">
                  Create account to see it in action.
                </p>
                <form className="m-t" id="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>FirstName</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="FirstName"
                      required
                      name="first_name"
                    />
                  </div>
                  <div className="form-group">
                    <label>LastName</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="LastName"
                      required
                      name="last_name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      required
                      name="email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      name="password"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      required
                      name="confirm_password"
                    />
                  </div>
                  <div className="form-group text-center">
                    <div className="checkbox i-checks">
                      <label>
                        {" "}
                        <input type="checkbox" name="confirm"></input>
                        <i></i> Agree the terms and policy{" "}
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary block full-width m-b"
                  >
                    Register
                  </button>

                  <p className="text-muted text-center">
                    <small>Already have an account?</small>
                  </p>
                  <Link to="/login" className="btn btn-sm btn-white btn-block">
                    Go to login
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
