import firebase from 'firebase';

export const config = {
  apiKey: 'AIzaSyCcWQftr51E8GZR0nFG2N207HZm8cLIM2Y',
  authDomain: 'park-place-pnw.firebaseapp.com',
  databaseURL: 'https://park-place-pnw.firebaseio.com',
  projectId: 'park-place-pnw',
  storageBucket: 'park-place-pnw.appspot.com',
  messagingSenderId: '886597794085'
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database(); //the real-time database
export const storage = firebase.storage(); //the firebase storage adjunct for images
export const auth = firebaseApp.auth(); //the firebase auth namespace

export const providers = firebase.auth;