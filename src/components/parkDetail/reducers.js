export const DETAIL_GET = 'DETAIL_GET';
export const REVIEWS_LOAD = 'REVIEWS_LOAD';
import { RESULTS_SET } from '../parkList/reducers';

const sortArray = (object) => {
  if(!object) return [];
  const array = Object.keys(object).sort((a, b) => object[b] - object[a]).filter(a => a != 'empty');
  if(array.length > 5) array.length = 5;

  return array;
};

export function currentPark(state = null, { type, payload }) {
  switch(type) {
    case DETAIL_GET:
      return payload;
    case RESULTS_SET:
      return null;
    default:
      return state;
  }
}

export function currentParkReviews(state = null, { type, payload }) {
  switch(type) {
    case REVIEWS_LOAD:
      return payload.reviews || null;
    case RESULTS_SET:
      return null;
    default:
      return state;
  }
}

export function currentParkDerivedData(state = null, { type, payload }) {
  switch(type) {
    case REVIEWS_LOAD:
      return ({
        tags: sortArray(payload.tags),
        amenities: sortArray(payload.amenities),
        averageRating: payload.averageRating
      });
    case RESULTS_SET:
      return null;
    default:
      return state;
  }
}