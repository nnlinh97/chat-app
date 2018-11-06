import { firestore } from "firebase";
var randomstring = require("randomstring");


export const sendMessage = (message) => {
    console.log(message);
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        let storageRef = firebase.storage().ref();
        const metadata = {
            contentType: 'image/*'
        };

        firestore.get({ collection: 'messages', where: [['idSum', '==', message.idSum]] }).then((res) => {
            let findMessageResult = res.docs;
            if (message.message.images.length > 0) {
                const images = message.message.images;
                let promises = [];
                images.forEach(item => {
                    promises.push(storageRef.child('images/' + randomstring.generate() + '_' + item.name).put(item, metadata));
                });
                // for (let i = 0; i < images.length; i++) {
                //     var uploadTask = storageRef.child('images/' + randomstring.generate() + '_' + images[i].name).put(images[i], metadata);
                //     promises.push(uploadTask.snapshot.ref.getDownloadURL());
                // }
                Promise.all(promises).then((data) => {
                    promises = [];
                    data.forEach(item => {
                        promises.push(item.ref.getDownloadURL());
                    });
                }).then(() => {
                    Promise.all(promises).then((imgURLs) => {
                        console.log(imgURLs);
                        const itemMessage = {
                            ...message,
                            message: {
                                ...message.message,
                                images: imgURLs
                            }
                        }
                        if (findMessageResult.length == 0) {
                            firestore.collection('messages').add({
                                idSender: message.idSender,
                                idReceiver: message.idReceiver,
                                idSum: message.idSum,
                                messages: [
                                    itemMessage.message
                                ]
                            })
                        } else {
                            let messages = findMessageResult[0].data().messages;
                            messages.push(itemMessage.message);
                            const id = findMessageResult[0].id;
                            firestore.update({ collection: 'messages', doc: id }, { messages }).then(() => {
                                console.log('update message');
                            })
                        }
                    })
                })
                // Promise.all(promises).then((imgURLs) => {
                //     console.log(imgURLs);
                //     const itemMessage = {
                //         ...message,
                //         message: {
                //             ...message.message,
                //             images: imgURLs
                //         }
                //     }
                //     if (findMessageResult.length == 0) {
                //         firestore.collection('messages').add({
                //             idSender: message.idSender,
                //             idReceiver: message.idReceiver,
                //             idSum: message.idSum,
                //             messages: [
                //                 itemMessage.message
                //             ]
                //         })
                //     } else {
                //         let messages = findMessageResult[0].data().messages;
                //         messages.push(itemMessage.message);
                //         const id = findMessageResult[0].id;
                //         firestore.update({ collection: 'messages', doc: id }, { messages }).then(() => {
                //             console.log('update message');
                //         })
                //     }
                // })
            } else {
                if (res.docs.length == 0) {
                    firestore.collection('messages').add({
                        idSender: message.idSender,
                        idReceiver: message.idReceiver,
                        idSum: message.idSum,
                        messages: [
                            message.message
                        ]
                    });
                } else {
                    let messages = findMessageResult[0].data().messages;
                    messages.push(message.message);
                    const id = findMessageResult[0].id;
                    firestore.update({ collection: 'messages', doc: id }, { messages }).then(() => {
                        console.log('add message');
                    })
                }
            }
        })
    }
};

