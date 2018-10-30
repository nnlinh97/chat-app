import React, { Component } from 'react';
import firebase from "firebase";
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
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
        firebase.login({ provider: 'google', type: 'popup' }).then((user) => {
            localStorage.setItem('user', JSON.stringify({
                ...user.additionalUserInfo.profile,
                lastSignInTime: null,
                isLogged: true
            }));
            this.props.signIn({
                ...user.additionalUserInfo.profile,
                lastSignInTime: null,
                isLogged: true
            });
            // this.setState({
            //     isLogged: true
            // })
            this.props.history.push('/messenger');
        })
    }
    
    componentWillMount() {
        let user = localStorage.getItem('user');
        if(user !== null){
            this.props.history.push('/messenger');
        }
    }
    render() {
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

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (user) => dispatch(signIn(user))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Login));
// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//         { collection: 'users' }
//     ])
// )(Login)