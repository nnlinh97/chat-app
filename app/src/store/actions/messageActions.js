import { firestore } from "firebase";


export const sendMessage = (message) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        let storageRef = firebase.storage().ref();
        const metadata = {
            contentType: 'image/*'
        };

        let query2 = firestore.get({ collection: 'messages', where: [['idSum', '==', message.idSum]] }).then((res) => {
            let findMessageResult = res.docs;
            if (message.message.image !== '') {
                const image = message.message.image;
                var uploadTask = storageRef.child('images/' + image.name).put(image, metadata);
                uploadTask.snapshot.ref.getDownloadURL().then((imageURL) => {
                    const itemMessage = {
                        ...message,
                        message: {
                            ...message.message,
                            image: imageURL
                        }
                    }
                    console.log(itemMessage);
                    if (findMessageResult.length == 0) {
                        console.log('0, image');
                        firestore.collection('messages').add({
                            idSender: message.idSender,
                            idReceiver: message.idReceiver,
                            idSum: message.idSum,
                            messages: [
                                itemMessage.message
                            ]
                        });
                    } else {
                        console.log('1, image');
                        let messages = findMessageResult[0].data().messages;
                        messages.push(itemMessage.message);
                        const id = findMessageResult[0].id;
                        firestore.update({ collection: 'messages', doc: id }, { messages }).then(() => {
                            console.log('update message');
                        })
                    }
                });
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
                    // console.log(res.docs[0].data().message);
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

export const sendImage = (image) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        console.log(image);


        let storageRef = firebase.storage().ref();

        var metadata = {
            contentType: 'image/*'
        };

        var uploadTask = storageRef.child('images/' + image.name).put(image, metadata);

        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('image available at', downloadURL);
        });


        // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED).then((snapshot) => {
        //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     console.log('Upload is ' + progress + '% done');
        //     switch (snapshot.state) {
        //         case firebase.storage.TaskState.PAUSED:
        //             console.log('Upload is paused');
        //             break;
        //         case firebase.storage.TaskState.RUNNING:
        //             console.log('Upload is running');
        //             break;
        //     }
        // }).then(() => {
        //     uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        //         console.log('image available at', downloadURL);
        //     });
        // })

    }
};