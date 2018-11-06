import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MenuListUsers from '../components/MenuListUsers';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../styles/home.css'
import SearchUser from '../components/SearchUser';
import ChatContent from '../components/ChatContent';
import {getDataUser} from '../store/actions/chatDataActions';
import {listenDisConnect} from '../store/actions/authActions';

class Home extends Component {

    componentDidMount() {
        this.props.listenDisConnect(this.props.auth.uid);
        if (localStorage.getItem('login') === 'unlogged') {
            this.props.history.push('/');
        }
        const {id} = this.props.match.params;
        this.props.getDataUser(id);
    }
    componentWillReceiveProps(nextProps) {
        const { id } = nextProps.match.params;
        this.props.getDataUser(id);
    }

    render() {
        const { auth } = this.props;
        const { displayName, photoURL } = auth;
        return (
            <div id="frame">
                <div id="sidepanel">
                    <div id="profile">
                        <div className="wrap">
                            <img id="profile-img" src={photoURL} className="online" alt="" />
                            <p id="profile-name">{displayName}</p>
                        </div>
                    </div>
                    <MenuListUsers/>
                </div>
                <ChatContent />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDataUser: (id) => dispatch(getDataUser(id)),
        listenDisConnect: (uid) => dispatch(listenDisConnect(uid))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));