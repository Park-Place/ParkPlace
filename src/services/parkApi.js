import { db } from './firebase';
import { auth } from './firebase';

const reviewsByPark = db.ref('reviewsByPark');
const reviewsRef = db.ref('reviews');
const users = db.ref('users');
const derivedParkData = db.ref('derivedParkData');

const sortArray = (object) => {
  if(!object) return [];
  const array = Object.keys(object).sort((a, b) => object[b] - object[a]).filter(a => a != 'empty');
  if(array.length > 5) array.length = 5;

  return array;
};

export const onReviewsList = (id, prevId, handler) => {
  if(prevId) reviewsByPark.child(prevId).off();
  
  reviewsByPark.child(id).on('value', data => {
    const reviewIds = data.val();
    if(!reviewIds) return null;
    
    return handler(reviewIds);
  });
};

export const onReview = (id, cb) => {

  reviewsRef.child(id).on('value', data => {
    const review = data.val();
    users.child(review.userId).on('value', d => {
      const user = d.val();
      const allInfo = {
        ...user,
        ...review
      };
      cb(allInfo);
    });
  });
};

export const onParkDerivedData = (id, prevId, handler) => {
  if(prevId) derivedParkData.child(prevId).off();

  derivedParkData.child(id).on('value', data => {
    const derivedData = data.val();
    if(!derivedData) return null;
    const derivedDataReformated = {
      tags: sortArray(derivedData.tags),
      amenities: sortArray(derivedData.amenities),
      averageRating: derivedData.averageRating
    };
    handler(derivedDataReformated);
  });
};

export const onUserLoad = (id, handler) => {
  users.child(id).on('value', (data) => handler(data.val()));
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