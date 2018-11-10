import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import { sendMessage } from './../store/actions/messageActions';
import { updatePriority } from './../store/actions/userActions';
import storage from '../config/fbConfig';
var randomstring = require("randomstring");

class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            idReceiver: '',
            image: '',
            url: '',
            previewURL: [],
            images: []
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
                images: this.state.images,
                idSender: idSender,
                photoURL: this.props.auth.photoURL,
                time: new Date()
            }
        }
        const priorityUser = {
            idSender: idSender,
            idReceiver: idReceiver,
            timeChat: new Date
        }
        if (this.state.message !== '' || this.state.images.length > 0) {
            this.props.sendMessage(message);
            this.props.updatePriority(priorityUser);
            this.setState({
                message: '',
                image: '',
                images: [],
                previewURL: []
            })
        }
        // this.handleUpload();
    }

    onHandleLoadImage = (e) => {
        this.inputFullNameRef.current.focus();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            if (file) {
                this.setState({
                    image: file,
                    reset: true,
                    previewURL: [...this.state.previewURL, reader.result],
                    images: [...this.state.images, file]
                }, () => {
                    this.setState({
                        reset: false
                    })
                });
            }
        }
        reader.readAsDataURL(file);
    }

    onDeletePreview = (index) => {
        this.inputFullNameRef.current.focus();
        let previewImg = this.state.previewURL;
        let images = this.state.images;
        images.splice(index, 1);
        previewImg.splice(index, 1);
        this.setState({
            previewURL: previewImg
        })
    }

    onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            this.onHandleSubmit(e);
        }
    }


    render() {
        let value = this.state.message;
        const { previewURL } = this.state;
        console.log(previewURL);
        let previewImage = null;
        if (previewURL.length > 0) {
            previewImage = previewURL.map((url, index) => {
                return (
                    <div key={index} className="image-list">
                        <span className="image-box">
                            <span onClick={() => this.onDeletePreview(index)} className="delete">X</span>
                            <img key={index} className="preview-image" src={url} />
                        </span>
                    </div>
                )
            })
        }
        return (
            <div className="message-input">
                <div className="wrap">
                    <form onSubmit={this.onHandleSubmit} className="text-chat">
                        <textarea onKeyDown={this.onEnterPress} onChange={this.onHandleChange} ref={this.inputFullNameRef} name="message" value={value} placeholder="Write your message..."></textarea>
                        {/* <input onChange={this.onHandleChange} ref={this.inputFullNameRef} name="message" value={value} type="text" placeholder="Write your message..." /> */}
                        <div className="preview">
                            {previewImage}
                        </div>
                        <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                        <label htmlFor="file" className="fa fa-image load-image">
                        </label>
                        {!this.state.reset && (
                            <input id="file" onChange={this.onHandleLoadImage} type="file" name="myfile" />
                        )}
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
        updatePriority: (priorityUser) => dispatch(updatePriority(priorityUser))
    }
}


export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(SendMessage))