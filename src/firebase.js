import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC4IO3dedie2OgTKwzpfC1-U9BG7JToRs4',
  authDomain: 'colone-f4a8b.firebaseapp.com',
  projectId: 'colone-f4a8b',
  storageBucket: 'colone-f4a8b.appspot.com',
  messagingSenderId: '768997540330',
  appId: '1:768997540330:web:35a4fdc649db98bf82f293',
  measurementId: 'G-N65SVSB0S4',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
