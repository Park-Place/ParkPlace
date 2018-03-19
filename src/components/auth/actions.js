import { USER_SET } from './reducers';
import { onUserStateChange, onSignUp, onSignIn, onSignOut } from '../../services/gameApi';

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

export function signup({ email, password }) {
  return () => onSignUp(email, password);
}

export function signin({ email, password }) {
  return () => onSignIn(email, password);
}

export function logout() {
  return () => onSignOut();
}