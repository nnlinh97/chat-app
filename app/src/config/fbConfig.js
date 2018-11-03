import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyB_UmnzdezLILDGsKyTlp_FY2FBa3HIWVo",
  authDomain: "app1-187cb.firebaseapp.com",
  databaseURL: "https://app1-187cb.firebaseio.com",
  projectId: "app1-187cb",
  storageBucket: "app1-187cb.appspot.com",
  messagingSenderId: "896366178274"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export const ggAuth = new firebase.auth.GoogleAuthProvider();
export default firebase;

export const storage = firebase.storage().ref();
