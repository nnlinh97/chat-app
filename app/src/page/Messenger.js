import React, { Component } from 'react';
import { signOut } from '../store/actions/authActions';
import {compose} from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../styles/login.css'
import { withFirestore, firestoreConnect } from 'react-redux-firebase';

class Messenger extends Component {
    signOut = () => {
        this.props.signOut(() => {
            this.props.history.push('/');
        })
    }

    componentDidMount() {
        if(localStorage.getItem('login') === 'unlogged'){
            this.props.history.push('/');
        }
    }
    

    render() {
        console.log(this.props.firebase);
        // console.log(this.props.auth.providerData);
        const data = this.props.auth.providerData;
        let email = '';
        if(data){
            email = data[0].email;
        }
        console.log(this.props.users);
        return (
            <div className="btn-login">
                <h1>{email}</h1>
                <button onClick={this.signOut} type="button" className="btn btn-danger">Sign Out</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        auth: state.firebase.auth,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: (callback) => dispatch(signOut(callback)),
    }
}
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Messenger));
export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'users'}
    ])
)(Messenger))