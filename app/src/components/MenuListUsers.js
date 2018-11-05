import React, { Component } from 'react';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import MenuUser from './MenuUser';
import SearchUser from './SearchUser';

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
        let { keyword } = this.state;
        const uid = this.props.auth.uid;
        let list = _.values(this.props.users);
        const index = _.findIndex(list, { 'uid': uid });
        let priority = [];
        if (index !== -1) {
            priority = list[index].priority;
            if (priority) {
                for (let i = 0; i < list.length; i++) {
                    for (let j = 0; j < priority.length; j++) {
                        if (list[i].uid == priority[j].idUser) {
                            list[i].star = priority[j].star;
                            list[i].timeChat = priority[j].timeChat;
                        }
                    }
                }
            }
        }
        for (let i = 0; i < list.length; i++) {
            list[i].scoreStar = list[i].star ? 100 * (new Date()) : 1;
            list[i].scoreTime = list[i].timeChat ? list[i].timeChat.seconds : 0.9;
        }
        list.sort((a, b) => {
            return ((b.scoreStar * b.scoreTime) - (a.scoreTime * a.scoreStar));
        });
        const users = _.values(this.props.users).filter((user) => {
            return user.username.toLowerCase().indexOf(keyword) !== -1;
        })
        let usersList = null;
        if (list.length > 0) {
            usersList = list.map((user, index) => {
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
                    <input onChange={this.onHandleChange} name="keyword" type="text" value={keyword} placeholder="Search contacts..." />
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