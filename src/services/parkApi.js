import { db } from './firebase';
import { auth } from './firebase';

const reviewsByPark = db.ref('reviewsByPark');
const reviewsRef = db.ref('reviews');
const users = db.ref('users');

export const onReviewsList = (id, prevId, handler) => {
  if(prevId) reviewsByPark.child(prevId).off();
  
  reviewsByPark.child(id).on('value', data => {
    const reviews = data.val();
    let reviewsArr = [];
    if(!reviews) return reviewsArr;
    else {
      for(let key in reviews) {
        reviewsRef.child(key).once('value', (data) => {
          let review = data.val();
          reviewsArr.push(review);
        });
      }
    }

    handler(reviewsArr);
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