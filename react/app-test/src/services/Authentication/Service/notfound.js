import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { authenticationService } from '../Service/authentication.service';
class notfound extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        const { match: { params } } = this.props;
        console.log(params)
        // if (props.location.pathname === "/") {
        //     this.props.history.push('/login'); //return to login
        // }
        // if (!authenticationService.currentUserValue) {
        //     this.props.history.push('/login'); //return to login
        // }
    }
    render() {
        return (
            <div className="middle-box text-center animated fadeInDown">
                <h1>404</h1>
                <h3 className="font-bold">Page Not Found</h3>
                {/* <div className="error-desc">
                    Sorry, but the page you are looking for has note been found. Try checking the URL for error, then hit the refresh button on your browser or try found something else in our app.

                </div> */}
                <div className="text-center m-4">
                    <Link to='/login' className="btn btn-primary">Go to login</Link>
                </div>
            </div>
        )
    }
}
export default notfound;

