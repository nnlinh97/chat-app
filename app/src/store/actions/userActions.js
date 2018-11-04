import { firestore } from "firebase";
import _ from 'lodash';


export const updatePriority = (priorityUser) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        console.log(priorityUser);

        firestore.get({ collection: 'users', where: [['uid', '==', priorityUser.idSender]] }).then((res) => {
            const findUserResult = res.docs;
            if (findUserResult.length > 0) {
                
                if (priorityUser.timeChat !== null) {
                    const itemUser = {
                        idUser: priorityUser.idReceiver,
                        timeChat: priorityUser.timeChat
                    }
                    let user = findUserResult[0].data();
                    let priority = user.priority;
                    if (!priority) {
                        // console.log('chua tung chat voi ai luon');
                        priority = [itemUser];
                    } else {
                        // console.log('da co chat');
                        const index = _.findIndex(priority, {'idUser': itemUser.idUser});
                        if(index !== -1){
                            // console.log('nguoi nay da tung chat roi');
                            // console.log('index', index);
                            priority[index].timeChat = itemUser.timeChat;
                        } else {
                            // console.log('chua tung chat voi nguoi nay');
                            priority.push(itemUser);
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