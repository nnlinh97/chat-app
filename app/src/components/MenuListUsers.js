import React, { Component } from 'react';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import MenuUser from './MenuUser';
import SearchUser from './SearchUser';


// var findIndex = (array, name) => {
//     let result = -1;
//     array.forEach(element => {
        
//     });
// }

class MenuListUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reRender: false,
            keyword: ''
        }
    }

    onHandleChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        console.log(_.values(this.props.users));
        console.log(this.state.keyword);
        let {keyword} = this.state;
        const users = _.values(this.props.users).filter((user) => {
            return user.username.toLowerCase().indexOf(keyword) !== -1;
        })
        let usersList = null;
        if (users.length > 0) {
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
            <div>
                <div id="search">
                    <input onChange={this.onHandleChange}  name="keyword" type="text" value={keyword} placeholder="Search contacts..." />
                </div>
                <div id="contacts">
                    <ul>
                        {usersList}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.data.users,
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