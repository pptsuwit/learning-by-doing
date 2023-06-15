import React, { Component } from 'react';
import { Link } from "react-router-dom";
const $ = window.$;
class login extends Component {
    componentDidMount() {
        $(document).ready(function () {
            $("#form").validate({
                rules: {
                    password: {
                        required: true,
                        minlength: 3
                    },
                    url: {
                        required: true,
                        url: true
                    },
                    number: {
                        required: true,
                        number: true
                    },
                    min: {
                        required: true,
                        minlength: 6
                    },
                    max: {
                        required: true,
                        maxlength: 4
                    }
                }
            });
        });
    }
    onChangeSwich = () => {
    }
    render() {
        return (
            <div className="container">
                <div className="row ">
                    <div className="col">
                        <div className="gray-bg ibox-content loginscreen animated fadeInDown  align-self-center">
                            <div>
                                <div>
                                    <div>
                                        <h1 className="text-center">INCOZE</h1>
                                    </div>
                                    {/* <h3>Welcome to IN+</h3> */}
                                    {/* <p>Login in. To see it in action.</p> */}
                                    <form className="m-t" action="index.html" id="form">
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Username" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password" required />
                                        </div>
                                        <button type="submit" className="btn btn-primary block full-width m-b">Login</button>

                                        <Link to="/forgotpassword"><small>Forgot password?</small></Link>
                                        {/* <p className="text-muted text-center"><small>Do not have an account?</small></p> */}
                                        {/* <Link to="/register" className="btn btn-sm btn-white btn-block">Create an account</Link> */}
                                    </form>
                                    <p className="m-t"> <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default login;