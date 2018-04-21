import { getParkDetail } from '../../services/googleAPI';
import { DETAIL_GET, REVIEWS_LOAD, DERIVED_GET } from './reducers';
import { db } from '../../services/firebase';
import { onReviewsList, onParkDerivedData, onReview } from '../../services/parkApi';
import uid from 'uuid/v1';

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

export function getReview(id) {
  return onReview(id);
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

export function submitReview(reviewObj, userId, priorReview) {

  const { rating, amenities, review, tags, parkName, parkId, photoReference } = reviewObj;

  const filteredAmenities = filterDuplicates(amenities);
  const filteredTags = filterDuplicates(tags);
  const date = new Date();
  const newReview = reviews.push();
  const key = priorReview ? reviewObj.key : newReview.key;

  const reviewObjRestructured = {
    timeStamp: priorReview ? `Edited on ${date.toLocaleString()}` : date.toLocaleString(),
    rating: parseInt(rating),
    amenities: filteredAmenities,
    tags: filteredTags,
    review,
    parkName,
    photoReference,
    userId,
    parkId,
    key
  };

  reviews.child(key).set({ ...reviewObjRestructured });
  reviewsByPark.child(parkId).update({ [key]: uid() }); //needs a random hash as firebase will not update children if same as prior ({[key]: true} will not work here). Needs to be updated every time to trigger derived data recalculation in cloud function
  users.child(userId).child('reviews').update({ [key]: true });

}

export function deleteReview(parkId, userId, reviewId) {
  users.child(userId).child('reviews').child(reviewId).remove();
  reviewsByPark.child(parkId).child(reviewId).remove();
  reviews.child(reviewId).remove();
}