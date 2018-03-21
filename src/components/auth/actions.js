import { USER_SET } from './reducers';
import { onUserStateChange, onSignUp, onSignIn, onSignOut } from '../../services/parkApi';
import { db, storage } from '../../services/firebase';

const userAviStorage = storage.ref('users');
const users = db.ref('users');

export function listenForUser() {
  return dispatch => {
    onUserStateChange(user =>
      dispatch({
        type: USER_SET,
        payload: users.child(user.uid).once('value').then(data => data.val())
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
  return () => onSignUp(email, password)
    .then(user => {
      users.child(user.uid).set({ location, userName })
        .then(() => handleImageUpload(image, user.uid));
    });
}

export function signin({ email, password }) {
  return () => onSignIn(email, password);
}

export function logout() {
  return () => onSignOut();
}