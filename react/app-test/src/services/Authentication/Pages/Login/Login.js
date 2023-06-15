import React, { Component } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { authenticationService } from '../../Service/authentication.service';
import { history } from '../../../../services/Authentication/_helpers';
// const $ = window.$;

class login extends Component {
    state = {

    }

    componentDidMount() {
        // console.log(this.props.location);
    }
    onSubmit = e => {
        e.preventDefault();
        var params = {
            email: e.target.email.value,
            password: e.target.password.value,
            remember: e.target.remember.checked,
        }
        authenticationService.login(params.email, params.password, params.remember)
            .then(
                res => {
                    let { from } = this.props.location.state || { from: { pathname: "/" } };

                    this.props.history.push(from);
                    history.go(0);
                }
            ).catch(data => {
                let message;
                if (data === undefined) {
                    message = 'ERR_CONNECTION_REFUSED';
                }
                else {
                    message = data.data.message;
                }
                swal({
                    title: "Error",
                    text: message,
                    icon: "error",
                    button: 'OK',
                })
            });
    }

    render() {
        return (
            <div className="center-login gray-bg">
                <div className="login animated fadeInDown ">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center logo-name">Bullet Master</h1>
                        </div>
                        <div className="col-12">
                            <h3 className="text-center">Welcome to Bullet Master</h3>
                        </div>
                        <div className="col-12">

                            <form className="m-t" id="form" onSubmit={this.onSubmit} >
                                <div className="form-group row">
                                    <div className="col-6 mx-auto">
                                        <input type="text" className="form-control" placeholder="Username / Email" name="email" required={true} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-6 mx-auto">
                                        <input type="password" className="form-control" placeholder="Password" name="password" required={true} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-6 mx-auto">
                                        <button type="submit" className="btn btn-primary block full-width">Login</button>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-6 mx-auto">
                                        <div className="form-group row">
                                            <div className="text-left col">
                                                <label><input type="checkbox" name="remember" /> Remember me</label>
                                            </div>
                                            <div className="text-right col">
                                                <Link to="/forgotpassword"><small>Forgot password?</small></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div >
        )
    }
}
export default (login);