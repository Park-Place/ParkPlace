import { getParkDetail } from '../../services/googleAPI';
import { DETAIL_GET, REVIEWS_LOAD, DERIVED_GET } from './reducers';
import { db } from '../../services/firebase';
import { onReviewsList, onParkDerivedData } from '../../services/parkApi';

const users = db.ref('users');
const reviewsByPark = db.ref('reviewsByPark');
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

let prevParkDerivedId;

export function setParkDerivedData(id) {
  if(prevParkDerivedId === id) return;
  return dispatch => {
    
    onParkDerivedData(id, prevParkDerivedId, data => {
      dispatch({
        type: DERIVED_GET,
        payload: data
      });
    });

    prevParkDerivedId = id;
  };
}

let prevParkReviewId;

export function loadReviews(id) {
  
  if(prevParkReviewId === id) return;
  return dispatch => {
    onReviewsList(id, prevParkReviewId, reviews => {
      dispatch({
        type: REVIEWS_LOAD,
        payload: reviews
      });
    });

    prevParkReviewId = id;    
  };
}

export function getUserById(id) {
  return users.child(id).once('value');
}

export function submitReview(reviewObj, userId, priorReview) {

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
    parkId
  };

  users.child(userId).child('reviews').update({ [newReview.key]: true });

  reviewsByPark.child(parkId).update({ [newReview.key]: true });

  reviews.child(newReview.key).set({ ...reviewObjRestructured });
}

export function deleteReview(parkId, userId) {
  users.child(userId).child('reviews').child(parkId).remove();
  reviewsByPark.child(parkId).child(userId).remove();
  reviews.child(userId).child(parkId).remove();
}