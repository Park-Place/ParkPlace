export const DETAIL_GET = 'DETAIL_GET';
export const REVIEWS_LOAD = 'REVIEWS_LOAD';

export function currentPark(state = null, { type, payload }) {
  switch(type) {
    case DETAIL_GET:
      return payload;
    default:
      return state;
  }
}

export function currentParkReviews(state = [], { type, payload }) {
  switch(type) {
    case REVIEWS_LOAD:
      return payload;
    default:
      return state;
  }
}