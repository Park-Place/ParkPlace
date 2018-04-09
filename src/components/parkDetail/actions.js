import { getParkDetail } from '../../services/googleAPI';
import { DETAIL_GET, REVIEWS_LOAD } from './reducers';
import { db } from '../../services/firebase';
import { onReviewsList } from '../../services/parkApi';

const users = db.ref('users');
const parksReviewed = db.ref('parksReviewed');
const reviews = db.ref('reviews');

const filterDuplicates = (string) => {

  if(string === '') return ['empty'];

  const array = string.toLowerCase().split(' ').map(s => s.trim()).filter(s => s !== '');

  return [...new Set(array).keys()]; //filters out duplicates
};

export function getParkById(id) {
  return {
    type: DETAIL_GET,
    payload: getParkDetail(id)
  };
}

let parkRef;

export function loadReviews(id) {
  
  return dispatch => {
    if(parkRef === id) return;

    onReviewsList(id, parkRef, reviews => {
      dispatch({
        type: REVIEWS_LOAD,
        payload: reviews
      });
    });

    parkRef = id;    
  };
}

export function getUserById(id) {
  return users.child(id).once('value');
}

export function submitReview(reviewObj, userId, userName, userPhoto, priorReview) {

  const { rating, amenities, review, tags, parkName, parkId, photoReference } = reviewObj;

  const filteredAmenities = filterDuplicates(amenities);
  const filteredTags = filterDuplicates(tags);
  const date = new Date();
  const newReview = reviews.push();

  const reviewObjRestructured = {
    timeStamp: priorReview ? `Edited on ${date.toLocaleString()}` : date.toLocaleString(),
    rating: parseInt(rating),
    amenities: filteredAmenities,
    tags: filteredTags,
    review,
    parkName,
    photoReference,
    userId,
    userName,
    userPhoto,
    parkId
  };

  users.child(userId).child('reviews').update({ [newReview.key]: true });

  parksReviewed.child(parkId).update({ [newReview.key]: true });

  reviews.child(newReview.key).set({ ...reviewObjRestructured });
}

export function deleteReview(parkId, userId) {
  users.child(userId).child('reviews').child(parkId).remove();
  parksReviewed.child(parkId).child(userId).remove();
  reviews.child(userId).child(parkId).remove();
}