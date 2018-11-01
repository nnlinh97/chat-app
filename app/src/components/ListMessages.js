import React, { Component } from 'react';
import Message from './Message';

class ListMessages extends Component {
    render() {
        return (
            <ul>
                <Message/>
            </ul>
        );
    }
}

export default ListMessages;