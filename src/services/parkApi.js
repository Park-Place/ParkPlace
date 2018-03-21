import { db } from './firebase';
import { auth } from './firebase';


const parksReviewed = db.ref('parksReviewed');

export const onReviewsList = (id, handler) => {
  parksReviewed.child(id).child('reviews').on('value', data => {
    const reviews = data.val();
    if(!reviews) return [];

    handler(reviews);
  });
};

export const onUserStateChange = handler => {
  auth.onAuthStateChanged(user => {
    handler(user);
  });
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