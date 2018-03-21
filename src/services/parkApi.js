import { db } from './firebase';
import { auth } from './firebase';


const parksReviewed = db.ref('parksReviewed');
const users = db.ref('users');

export const onReviewsList = (id, handler) => {
  parksReviewed.child(id).child('reviews').on('value', data => {
    const reviews = data.val();
    if(!reviews) return [];

    handler(reviews);
  });
};

export const onUserLoad = (id, handler) => {
  users.child(id).once('value', data => {
    const userInfo = data.val(); 
    
    handler(userInfo);
  });
};

export const onUserReviewsLoad = (id, handler) => {
  users.child(id).child('reviews').on('value', data => {
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