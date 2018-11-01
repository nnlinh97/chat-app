import React, { Component } from 'react';
import ListMessages from './ListMessages';
import SignOut from './SignOut';
import { connect } from 'react-redux';
import moment from 'moment';

class ChatContent extends Component {
    
    render() {
        if(this.props.chatingUser == null){
            return '';
        }
        // console.log(this.props.chatingUser);
        const {username, photoURL, online, lastSignInTime} = this.props.chatingUser;
        let status = '';
        let css = 'name-chat-box-online';
        // if(!online){
        //     status = `(${moment(lastSignInTime.toDate()).calendar()})`;
        //     css = 'name-chat-box-busy';
        // }
        return (
            <div className="content">
                <div className="contact-profile">
                    <img id="img-chat" src={photoURL} alt="" />
                    <p id="name-chat">{username}</p>
                    {/* <span id="name-chat-box-online"></span> */}
                    {/* <span id={css}></span>  */}
                    {/* <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{status}</p> */}
                    <SignOut/>
                </div>
                <div className="messages">
                    <ListMessages />
                    {/* <ul>
                            <li className="replies">
                                <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                <p>When you're backed against the wall, break the god damn thing down.</p>
                            </li>
                            <li className="replies">
                                <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                <p>Excuses don't win championships.</p>
                            </li>
                            <li className="sent">
                                <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                                <p>Oh yeah, did Michael Jordan tell you that?</p>
                            </li>
                            <li className="replies">
                                <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                <p>No, I told him that.</p>
                            </li>
                            <li className="replies">
                                <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                <p>What are your choices when someone puts a gun to your head?</p>
                            </li>
                            <li className="sent">
                                <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                                <p>What are you talking about? You do what they say or they shoot you.</p>
                            </li>
                            <li className="replies">
                                <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                <p>Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty six other things.</p>
                            </li>
                        </ul> */}
                </div>
                <div className="message-input">
                    <div className="wrap">
                        <input type="text" placeholder="Write your message..." />
                        <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                        <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chatingUser: state.chatingUser
    }
}

export default connect(mapStateToProps, null)(ChatContent);