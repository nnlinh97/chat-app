import React, { Component } from 'react';
import moment from 'moment';

class Message extends Component {
    render() {
        const { message, status } = this.props;
        const title = moment(message.time.toDate()).calendar();
        let content = '';
        let images = null;
        if (message.images) {
            images = message.images.map((img, index) => {
                return <img  key={index} title={title} className="image-message" src={img} alt="" />
            })
        }
        if (message.text !== '') {
            content = <p title={title}>
                {message.text}
                {images}
            </p>;
        }
        return (
            <li className={status}>
                <img src={message.photoURL} alt="" />
                <p title={title}>
                    {message.text}
                    {images}
                </p>
            </li>
        );
    }
}

export default Message;