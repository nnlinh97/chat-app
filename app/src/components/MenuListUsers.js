import React, { Component } from 'react';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import MenuUser from './MenuUser';


class MenuListUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reRender: false
        }
    }
    
    render() {
        console.log(this.props.users);
        const { users } = this.props;
        let usersList = null;
        if (users) {
            usersList = users.map((user, index) => {
                return (
                    <MenuUser
                        key={index}
                        user={user}
                    />
                );
            });
        }
        return (
            <ul>
                {usersList}
            </ul>
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
    }
}

// export default MenuListUsers;
export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(MenuListUsers))