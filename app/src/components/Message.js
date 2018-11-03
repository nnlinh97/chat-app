import React, { Component } from 'react';
import moment from 'moment';

class Message extends Component {
    render() {
        const {message, status} = this.props;
        const title = moment(message.time.toDate()).calendar();
        let content = '';
        if(message.text !== ''){
            content = <p title={title}>{message.text}</p>;
        } else if(message.image !== ''){
            content = <img title={title} id="image-message" src={message.image} alt="" />
        }
        return (
            <li className={status}>
                <img src={message.photoURL} alt="" />
                {content}
            </li>
        );
    }
}

export default Message;