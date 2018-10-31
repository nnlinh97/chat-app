import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signOut, test } from '../store/actions/authActions';
import {compose} from 'redux'
import '../styles/login.css'
import { withFirestore, firestoreConnect } from 'react-redux-firebase';

class Messenger extends Component {
    signOut = () => {
        localStorage.clear();
        this.props.signOut(this.props.auth);
        this.props.history.push('/');
    }

    test = () => {
        this.props.test();
    }

    componentWillMount() {
        let user = localStorage.getItem('user');
        if (!user) {
            this.props.history.push('/');
        }
    }

    render() {
        // console.log(this.props.users);
        console.log(this.props.auth);
        return (
            <div className="btn-login">
                <h1>Messenger</h1>
                <button onClick={this.signOut} type="button" className="btn btn-danger">Sign Out</button>
                <button onClick={this.test} type="button" className="btn btn-info">test</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: (user) => dispatch(signOut(user)),
        test: () => dispatch(test())
    }
}
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Messenger));
export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'users'}
    ])
)(Messenger))