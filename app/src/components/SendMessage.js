import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import { sendMessage, sendImage } from './../store/actions/messageActions';
import storage from '../config/fbConfig';

class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            idReceiver: '',
            image: '',
            url: ''
        }
        this.inputFullNameRef = React.createRef();
    }

    componentDidMount() {
        this.inputFullNameRef.current.focus();
        this.setState({
            idReceiver: this.props.match.params.id
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            idReceiver: nextProps.match.params.id
        })
    }

    onHandleChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }

    onHandleSubmit = (e) => {
        this.inputFullNameRef.current.focus();
        console.log('onHandleSubmit');
        e.preventDefault();
        const idSender = this.props.auth.uid;
        const idReceiver = this.state.idReceiver;
        const idSum = idSender > idReceiver ? (idSender + idReceiver) : (idReceiver + idSender);
        const message = {
            idSender: idSender,
            idReceiver: idReceiver,
            idSum: idSum,
            message: {
                text: this.state.message,
                image: this.state.image,
                idSender: idSender,
                photoURL: this.props.auth.photoURL,
                time: new Date()
            }
        }
        if (this.state.message !== '' || this.state.image !== '') {
            this.props.sendMessage(message);
            this.setState({
                message: '',
                image: ''
            })
        }
        // this.handleUpload();
    }

    onHandleLoadImage = (e) => {
        this.inputFullNameRef.current.focus();
        console.log('load image');
        console.log(e.target.files);
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0],
                reset: true
            }, () => {
                this.setState({
                    reset: false
                })
            });
        }
    }
    
    render() {
        let value = this.state.message;
        console.log(this.state);
        return (
            <div className="message-input">
                <div className="wrap">
                    <form onSubmit={this.onHandleSubmit} className="text-chat">
                        <input onChange={this.onHandleChange} ref={this.inputFullNameRef}  name="message" value={value} type="text" placeholder="Write your message..." />
                        <label htmlFor="file" className="fa fa-image load-image">

                        </label>
                        {!this.state.reset && (
                            <input id="file" onChange={this.onHandleLoadImage} type="file" name="myfile"  />
                        )}
                        <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </form>
                </div>
            </div>
        );
    }
}

// export default SendMessage;
const mapStateToProps = (state) => {
    return {
        chatingUser: state.chatingUser,
        users: state.firestore.data.users,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message) => dispatch(sendMessage(message)),
        sendImage: (image) => dispatch(sendImage(image))
    }
}


export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(SendMessage))