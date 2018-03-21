export const DETAIL_GET = 'DETAIL_GET';
export const REVIEWS_LOAD = 'REVIEWS_LOAD';

// const turnToSortedArray = (object) => {
//   const array = Object.keys(object).sort((a,b) => )
// }

export function currentPark(state = null, { type, payload }) {
  switch(type) {
    case DETAIL_GET:
      return payload;
    default:
      return state;
  }
}

export function currentParkReviews(state = null, { type, payload }) {
  switch(type) {
    case REVIEWS_LOAD:
      return payload.reviews;
    default:
      return state;
  }
}

export function currentParkDerivedData(state = null, { type, payload }) {
  switch(type) {
    case REVIEWS_LOAD:
      return ({
        tags: payload.tags,
        amenities: payload.amenities,
        averageRating: payload.averageRating
      });
    default:
      return state;
  }
}