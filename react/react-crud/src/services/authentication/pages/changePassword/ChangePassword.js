import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "../../../utility/Axios";
import { Services } from "../../../utility/Utility";
// import swal from "sweetalert";
class ChangePassword extends Component {
  state = {
    token: null,
    redirect: false,
  };
  componentDidMount() {
    const token = this.props.location.pathname.substring(22);
    this.setState({
      token: token,
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (e.target.new_password.value !== e.target.confirm_password.value) {
      //   swal({
      //     title: "Error",
      //     text: "รหัสผ่านไม่ตรงกัน",
      //     icon: "error",
      //     button: "OK",
      //   });
    } else {
      console.log("this request is post");
      axios
        .post("/auth/changepassword", {
          password: e.target.new_password.value,
          token: this.state.token,
        })
        .then((res) => {
          //   swal({
          //     title: "Success",
          //     text: "บันทึกข้อมูลเสร็จสิ้น",
          //     icon: "success",
          //     button: "OK",
          //   }).then(() => {
          this.setState({ redirect: true });
          //   });
        })
        .catch((error) => {
          Services.error(error);
        });
    }
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
  };
  render() {
    return (
      <div className="center-login gray-bg">
        {this.renderRedirect()}
        <div className="login animated fadeInDown ">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center logo-name">HA Forum</h1>
            </div>
            <div className="col-12">
              {/* <h3 className="text-center">Activated account</h3> */}
            </div>
            <div className="col-12">
              <form className="m-t" id="form" onSubmit={this.onSubmit}>
                <div className="form-group col-6 mx-auto">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    name="new_password"
                  />
                </div>
                <div className="form-group col-6 mx-auto">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    required
                    name="confirm_password"
                  />
                </div>
                <div className="form-group col-6 mx-auto">
                  <button
                    type="submit"
                    className="btn btn-primary block full-width m-b "
                  >
                    Change Password
                  </button>
                </div>
                <div className="form-group col-6 mx-auto text-right">
                  <Link to="/login">Go to login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ChangePassword;
