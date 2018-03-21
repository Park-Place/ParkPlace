import { USER_SET } from './reducers';
import { onUserStateChange, onSignUp, onSignIn, onSignOut } from '../../services/parkApi';
import { db, storage } from '../../services/firebase';

const userAviStorage = storage.ref('users');
const users = db.ref('users');
const getUser = uid => users.child(uid).once('value').then(d => d.val());

export function listenForUser() {
  return dispatch => {
    onUserStateChange(user =>
      dispatch({
        type: USER_SET,
        payload: user ? getUser(user.uid) : null
      })
    );
  };
}

export function handleImageUpload(file, id) {
  const uploadTask = userAviStorage.child(id).put(file);
  const user = users.child(id);

  uploadTask.on('state_changed', () => {
    
  }, err => {
    this.setState({ error: err });
  }, () => {
    const downloadUrl = uploadTask.snapshot.downloadURL;
    user.update({ 'image': downloadUrl });      
  });
}

export function signup({ email, password, image, location, userName }) {
  return () => onSignUp(email, password) //create the user in auth
    .then(user => {
      users.child(user.uid).set({ location, userName }) //create the user in firebase
        .then(() => handleImageUpload(image, user.uid)); //add the image to storage and then database
    });
}

export function signin({ email, password }) {
  return () => onSignIn(email, password);
}

export function logout() {
  return () => onSignOut();
}