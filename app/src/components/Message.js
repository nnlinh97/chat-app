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
        const imgLinks = message.text.match(/(https?|ftp:)([^\s]+)/g);
        let links = null;
        if(imgLinks){
            links = imgLinks.map((link, index) => {
                return <img  key={index} title={title} className="image-message" src={link} alt="" />
            })
        }
        return (
            <li className={status}>
                <img src={message.photoURL} alt="" />
                <p title={title}>
                    {message.text}
                    {links}
                    {images}
                </p>
            </li>
        );
    }
}

export default Message;