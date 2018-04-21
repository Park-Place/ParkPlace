export const DETAIL_GET = 'DETAIL_GET';
export const REVIEWS_LOAD = 'REVIEWS_LOAD';
export const DERIVED_GET = 'DERIVED_GET';
import { RESULTS_SET } from '../parkList/reducers';


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
      return payload || null;
    case RESULTS_SET:
      return null;
    default:
      return state;
  }
}

export function currentParkDerivedData(state = null, { type, payload }) {
  switch(type) {
    case DERIVED_GET:
      return payload;
    case RESULTS_SET:
      return null;
    default:
      return state;
  }
}