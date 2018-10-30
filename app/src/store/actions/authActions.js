
export const signIn = (user) => {
    return (dispatch, getState, { getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        console.log(user);
        firestore.get({ collection: 'users', where: [['email', '==', user.email]] }).then((res) => {
            if (res.docs.length === 0) {
                firestore.collection('users').add({
                    ...user
                }).then(() => {
                    dispatch({ type: "SIGNIN_SUCCESS", user });
                }).catch(err => {
                    dispatch({ type: "SIGNIN_FAIL", err });
                });
            } else {
                const id = res.docs[0].id;
                const itemUpdate = {
                    ...user,
                    lastSignInTime: null
                }
                firestore.update({ collection: 'users', doc: id }, itemUpdate);
            }
        })
    }
};

export const signOut = () => {
    return (dispatch, getState, { getFirestore }) => {
        localStorage.setItem('user', null);
    }
};

export const test = () => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        console.log(firestore.update);
        firestore.collection('users').get().then((querySnapshot) => {
            // console.log(querySnapshot.docs);
            querySnapshot.docs.forEach((item) => {
                // console.log(item.data());                
            })
        })
    }
};