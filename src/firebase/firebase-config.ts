import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA6bTXbgw9FHL8ZjhCjd18ve0dl4nJubC0',
  authDomain: 'todoapp-f39d3.firebaseapp.com',
  projectId: 'todoapp-f39d3',
  storageBucket: 'todoapp-f39d3.appspot.com',
  messagingSenderId: '866304567839',
  appId: '1:866304567839:web:fc7eeaa5be7a3f9635832a',
};

firebase.initializeApp(firebaseConfig);
firebase
  .firestore()
  .settings({ experimentalForceLongPolling: true, merge: true });
const db = firebase.firestore();
export const listsRef = db.collection('board').doc('lists');

listsRef.get().then((snap) => {
  if (!snap.exists) {
    listsRef.set({ listsArr: [] });
  }
});

export const firestore = firebase.firestore;
export default db;
