export const KEYWORD_SEARCH = 'KEYWORD_SEARCH';
export const LOCATION_SEARCH = 'LOCATION_SEARCH';

export function keyword(state = null, { type, payload }) {
  switch(type) {
    case KEYWORD_SEARCH:
      return payload;
    default:
      return state;
  }
}

export function location(state = null, { type, payload }) {
  switch(type) {
    case LOCATION_SEARCH:
      return payload;
    default:
      return state;
  }
}