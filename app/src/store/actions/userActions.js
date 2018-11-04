import { firestore } from "firebase";
import _ from 'lodash';


export const updatePriority = (priorityUser) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();


        firestore.get({ collection: 'users', where: [['uid', '==', priorityUser.idSender]] }).then((res) => {
            //mai làm thêm cái update time chat cho thèn gửi đến mình
            //tức là firestore.get cho thèn nhận được tin nhắn, update lại priority cho thèn gửi trong thèn nhận đó
            const findUserResult = res.docs;
            if (findUserResult.length > 0) {
                let priority = findUserResult[0].data().priority;
                // let priority = user.priority;
                if (priorityUser.timeChat) {
                    const itemUser = {
                        idUser: priorityUser.idReceiver,
                        timeChat: priorityUser.timeChat
                    }
                    // let user = findUserResult[0].data();
                    // let priority = user.priority;
                    if (!priority) {
                        priority = [itemUser];
                    } else {
                        const index = _.findIndex(priority, { 'idUser': itemUser.idUser });
                        if (index !== -1) {
                            priority[index].timeChat = itemUser.timeChat;
                        } else {
                            priority.push(itemUser);
                        }
                    }
                    const id = findUserResult[0].id;
                    firestore.update({ collection: 'users', doc: id }, { priority }).then(() => {
                        console.log('update user');
                    })
                }
                if (priorityUser.updateStar) {
                    console.log('have star', priorityUser);
                    const item = {
                        idUser: priorityUser.idReceiver,
                        star: priorityUser.star
                    }
                    if (!priority) {
                        priority = [item];
                    } else {
                        const idx = _.findIndex(priority, { 'idUser': item.idUser });
                        if(idx !== -1){
                            priority[idx].star = item.star;
                        } else {
                            priority.push(item);
                        }
                    }
                    const id = findUserResult[0].id;
                    firestore.update({ collection: 'users', doc: id }, { priority }).then(() => {
                        console.log('update user');
                    })
                }

            }
        })
    }
};

export const updatePriority1 = (priorityUser) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        console.log(priorityUser);

    }
};