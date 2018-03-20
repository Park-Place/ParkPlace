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
        payload: user
      })
    );
  };
}

export function handleSubmit(event) {
  event.preventDefault();
  const { elements } = event.target;
  const { history, location } = this.props;

  const credentials = {
    email: elements.email.value,
    password: elements.password.value,
    picture: elements.image.value,
    location: elements.location.value
  };

  const { from } = location.state || { from: { pathname: '/' } };
  
  this.props.onSubmit(credentials)
    .then(() => {
      setTimeout(() => {
        history.push(from); //allows firebase to send the auth token prior to page move!
      }, 100);
    })
    .catch(error => this.setState({ error }));
}

export function handleFirebaseUpload(file) {
  const userAvi = this.userAvi.push();
  const uploadTask = this.userAviStorage.child(userAvi.key).put(file);

  uploadTask.on('state_changed', () => {
    
  }, err => {
    this.setState({ error: err });
  }, () => {
    const downloadUrl = uploadTask.snapshot.downloadUrl;
    userAvi.set(downloadUrl);      
  });
}

export function signup({ email, password }) {
  return () => onSignUp(email, password);
}

export function signin({ email, password }) {
  return () => onSignIn(email, password);
}

export function logout() {
  return () => onSignOut();
}