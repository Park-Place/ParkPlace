import firebase from 'firebase';

export const config = {
  apiKey: 'AIzaSyAdzahA9sPJmrJkJ0vpF3r2AMSvoY4wMMw',
  authDomain: 'poke-hang.firebaseapp.com',
  databaseURL: 'https://poke-hang.firebaseio.com',
  projectId: 'poke-hang',
  storageBucket: 'poke-hang.appspot.com',
  messagingSenderId: '336129779503'
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database(); //the real-time database
export const storage = firebase.storage(); //the firebase storage adjunct for images
export const auth = firebaseApp.auth(); //the firebase auth namespace

export const providers = firebase.auth;