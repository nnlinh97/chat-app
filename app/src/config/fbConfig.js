import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export default firebase 