import { getParkDetail } from '../../services/googleAPI';
import { DETAIL_GET, REVIEWS_LOAD } from './reducers';
import { db } from '../../services/firebase';
import { onReviewsList } from '../../services/parkApi';

const users = db.ref('users');
const parksReviewed = db.ref('parksReviewed');
let listening;

const filterDuplicates = (array) => {
  return array.filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
  });
};

export function getParkById(id) {

  return dispatch => {
    dispatch({
      type: DETAIL_GET,
      payload: getParkDetail(id)
    });
  };
}

export function loadReviews(id) {
  
  return dispatch => {
    if(listening) return;
    listening = true;

    onReviewsList(id, reviews => {
      dispatch({
        type: REVIEWS_LOAD,
        payload: reviews
      });
    });
  };
}

export function submitReview(state, parkObj, userObj) {

  const { rating, amenities, review, tags } = state;

  const splitAmenities = amenities.toLowerCase().split(' ');
  const splitTags = tags.toLowerCase().split(' ');

  const filteredAmenities = filterDuplicates(splitAmenities);
  const filteredTags = filterDuplicates(splitTags);

  const reviewObj = {
    timeStamp: new Date(),
    rating,
    amenities: filteredAmenities,
    tags: filteredTags,
    review,
    parkObj,
    userObj
  };

  users.child(userObj.userId).child('reviews').update({ [parkObj.parkId]: reviewObj });

  parksReviewed.child(parkObj.parkId).child('reviews').update({ [userObj.userId]: reviewObj });

}
