import { USER_SET } from './reducers';
import { onUserStateChange, onSignUp, onSignIn, onSignOut } from '../../services/parkApi';
import { db, storage } from '../../services/firebase';

const userAviStorage = storage.ref('users');
const users = db.ref('users');
let userRef = null;

export function listenForUser() {
  return dispatch => {
    onUserStateChange(user => {
      if(!user && userRef) userRef.off();
      if(user) {
        userRef = users.child(user.uid);
        userRef.on('value', d => {
          dispatch(setUser(d.val()));
        });
      }
      else dispatch(setUser(null));
    });
  };
}

function setUser(user) {
  return {
    type: USER_SET,
    payload: user
  };
}

export function handleImageUpload(file, id) {
  const uploadTask = userAviStorage.child(id).put(file);
  const user = users.child(id);
  return new Promise((resolve, reject) => {

    uploadTask.on('state_changed', () => {}, 
      reject, 
      () => {
        const downloadUrl = uploadTask.snapshot.downloadURL;
        user.update({ 'image': downloadUrl })
          .then(resolve);      
      });
  });
}

export function signup({ email, password, image, location, userName }) {
  return () => onSignUp(email, password) //create the user in auth
    .then(user => {
      return users.child(user.uid).set({ location, userName }) //create the user in firebase
        .then(() => handleImageUpload(image, user.uid)); //add the image to storage and then database
    });
}

export function signin({ email, password }) {
  return () => onSignIn(email, password);
}

export function logout() {
  return () => onSignOut();
}