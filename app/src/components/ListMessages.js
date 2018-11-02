import React, { Component } from 'react';
import Message from './Message';
import { withRouter } from 'react-router-dom';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import { sendMessage } from './../store/actions/messageActions';
import SendMessage from './SendMessage';

class ListMessages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idReceiver: ''
        }
    }

    componentDidMount() {
        this.setState({
            idReceiver: this.props.match.params.id
        })
        this.scrollToBottom();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            idReceiver: nextProps.match.params.id
        })
        this.scrollToBottom();
    }

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
    render() {
        const idSender = this.props.auth.uid;
        const idReceiver = this.state.idReceiver;
        const idSum = idSender > idReceiver ? (idSender + idReceiver) : (idReceiver + idSender);
        const firestoreMessages = _.find(_.values(this.props.messages), { 'idSum': idSum });
        console.log(firestoreMessages);
        let messages = null;
        let listMessage = '';
        if (firestoreMessages) {
            messages = firestoreMessages.messages;
            listMessage = messages.map((message, index) => {
                const status = message.idSender === idSender ? 'replies' : 'sent';
                return (
                    <Message
                        key={index}
                        message={message}
                        status={status}
                    />
                )
            })
        }
        return (
            <div>
                <div
                    className="messages"
                    ref={(div) => {
                        this.messageList = div;
                    }}>
                    <ul>
                        {listMessage}
                    </ul>
                </div>
                <SendMessage />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.firestore.data.messages,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message) => dispatch(sendMessage(message))
    }
}


export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'messages' }
    ])
)(ListMessages))
