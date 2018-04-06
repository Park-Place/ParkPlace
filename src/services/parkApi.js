import { db } from './firebase';
import { auth } from './firebase';


const parksReviewed = db.ref('parksReviewed');
const users = db.ref('users');

export const onReviewsList = (id, prevId, handler) => {
  if(prevId) parksReviewed.child(prevId).off();
  
  parksReviewed.child(id).on('value', data => {
    const reviews = data.val();
    if(!reviews) return { reviews: [] };

    handler(reviews);
  });
};

export const onUserLoad = (id, handler) => {
  users.child(id).on('value', data => handler(data.val()));
};


export const onUserStateChange = handler => {
  auth.onAuthStateChanged(user => handler(user));
};

export const onSignUp = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};
export const onSignIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const onSignOut = () => {
  return auth.signOut();
};