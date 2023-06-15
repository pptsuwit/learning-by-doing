import React, { Component } from 'react';
// import { Link } from "react-router-dom";
// import swal from 'sweetalert';
// import { authenticationService } from '../Service/authentication.service';
// import { history } from '../../../pages/Authentication/_helpers';

// const $ = window.$;
class Activated extends Component {
    state = {
        redirect: false
    }
    // constructor(props) {
    //     super(props);
    // }
    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params.token)
        // axios.get(`/api/users/${params.userId}`)
        //   .then(({ data: user }) => {
        //     console.log('user', user);

        //     this.setState({ user });
        //   });
    }
    onSubmit = e => {
    }
    render() {

        return (
            <div className="center-login gray-bg">
                <div className="login animated fadeInDown ">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center logo-name">Sirichat</h1>
                        </div>
                        <div className="col-12">
                            <h3 className="text-center">Activated account</h3>
                        </div>
                        <div className="col-12">

                            <form className="m-t" id="form" onSubmit={this.onSubmit} >
                                <div className="form-group row">
                                    <div className="col-6 mx-auto">
                                        <button type="submit" className="btn btn-primary block full-width">Activated</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default Activated;