import React, { Component } from 'react';
import { authenticationService } from '../Service/authentication.service';
class notfound extends Component {
    constructor(props) {
        super(props);
        if (!authenticationService.currentUserValue) {
            this.props.history.push('/auth/login'); //return to login
        }
    }
    render() { return (<div></div>) }
}
export default notfound;