import React, { Component } from 'react';
import firebase from "firebase";
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { signIn } from '../store/actions/authActions';
import '../styles/login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
    }

    onSignIn = () => {
        this.props.signIn(() => {
            this.props.history.push('/messenger');
        });
    }
    componentDidMount() {
        if (localStorage.getItem('login') === 'logged') {
            this.props.history.push('/messenger');
        }
    }
    render() {
        if (localStorage.getItem('login') === 'logged') {
            return <Redirect to='/messenger' />;
        }
        console.log(this.props.auth);
        return (
            <div className="container">
                <button className="btn btn-google btn-login" type="button"
                    onClick={this.onSignIn}
                >
                    <span className="fa fa-google-plus" /> Sign in with Google
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (callback) => dispatch(signIn(callback))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//         { collection: 'users' }
//     ])
// )(Login)