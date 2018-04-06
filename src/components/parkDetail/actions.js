import { getParkDetail } from '../../services/googleAPI';
import { DETAIL_GET, REVIEWS_LOAD } from './reducers';
import { db } from '../../services/firebase';
import { onReviewsList } from '../../services/parkApi';

const users = db.ref('users');
const parksReviewed = db.ref('parksReviewed');


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

let listening;

export function loadReviews(id) {
  
  return dispatch => {
    if(listening === id) return;

    onReviewsList(id, listening, reviews => {
      dispatch({
        type: REVIEWS_LOAD,
        payload: reviews
      });
    });

    listening = id;    
  };
}

export function submitReview(state, parkObj, userObj, priorReview) {

  const { rating, amenities, review, tags } = state;

  const filteredAmenities = filterDuplicates(amenities);
  const filteredTags = filterDuplicates(tags);
  const date = new Date();

  const reviewObj = {
    timeStamp: priorReview ? `Edited on ${date.toLocaleString()}` : date.toLocaleString(),
    rating: parseInt(rating),
    amenities: filteredAmenities,
    tags: filteredTags,
    review,
    parkObj,
    userObj
  };

  users.child(userObj.userId).child('reviews').update({ [parkObj.parkId]: reviewObj });

  parksReviewed.child(parkObj.parkId).child('reviews').update({ [userObj.userId]: reviewObj });

}

export function deleteReview(parkId, userId) {
  users.child(userId).child('reviews').child(parkId).remove();
  parksReviewed.child(parkId).child('reviews').child(userId).remove();
}