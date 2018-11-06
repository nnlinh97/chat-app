import React, { Component } from 'react';
import SignOut from './SignOut';
import { withRouter } from 'react-router-dom';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import {updatePriority} from './../store/actions/userActions';

class ContactProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            star: false
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.match.params.id
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.match.params.id
        })
    }

    onHandleStar = async (star) => {
        await this.setState({
            star: !this.state.star
        });
        this.props.updateUser({
            idSender: this.props.idSender,
            idReceiver: this.state.id,
            star: !star,
            updateStar: true
        });
    }


    render() {
        const users = _.values(this.props.users);
        const idSender = this.props.idSender;
        const user = _.find(users, { 'uid': this.state.id });
        let username = '';
        let photoURL = '';
        let online = '';
        let lastSignInTime = '';
        let status = 'online';
        let css = "name-chat-box-online";
        let classStar = 'fa fa-star uncheck';
        if (user) {
            username = user.username;
            photoURL = user.photoURL;
            online = user.online;
            lastSignInTime = user.lastSignInTime;
            if (!online) {
                status = moment(lastSignInTime.toDate()).calendar();
                css = "name-chat-box-busy";
            }
            if(user.star){
                classStar = 'fa fa-star check';
            }
        }
        return (
            <div className="contact-profile">
                <img id="img-chat" src={photoURL} alt="" />
                <p id="name-chat">{username}</p>
                {/* <span id="name-chat-box-online"></span> */}
                <span id={css}></span>
                <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{status}</p>
                <div className="rating-star">
                    <span onClick={() => this.onHandleStar(user.star)} className={classStar}></span>
                </div>
                <SignOut />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chatingUser: state.chatingUser,
        users: state.firestore.data.users,
        idSender: state.firebase.auth.uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (priorityUser) => dispatch(updatePriority(priorityUser))
    }
}


export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(ContactProfile))