import { getParkDetail } from '../../services/googleAPI';
import { DETAIL_GET } from './reducers';
import { db } from '../../services/firebase';

const users = db.ref('users');
const parksReviewed = db.ref('parksReviewed');

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
