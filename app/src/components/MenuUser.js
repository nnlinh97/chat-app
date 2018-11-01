import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { chatWithUser } from '../store/actions/currentChat';


class MenuUser extends Component {
    onChat = (id) => {
        console.log(id);
        this.props.chatWithUser(id);
        this.props.history.push(`/messenger/${id}`);
    }
    render() {
        //status: online, busy
        const { user } = this.props;
        const { username, online, lastSignInTime, photoURL } = user;
        let status = "online";
        if (!online) {
            status = moment(lastSignInTime.toDate()).calendar();
        }
        return (
            <li className="contact" onClick={() => this.onChat(user.uid)}>
                <div className="wrap">
                    <img src={photoURL} alt="" />
                    <div className="meta">
                        <p className="name">{username}</p>
                        <span className={online ? "contact-status online" : "contact-status busy"}></span>
                        <p className="preview">{status}</p>
                    </div>
                </div>
            </li>
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
        chatWithUser: (id) => dispatch(chatWithUser(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuUser));