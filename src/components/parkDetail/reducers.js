export const DETAIL_GET = 'DETAIL_GET';

export function detailResult(state = null, { type, payload }) {
  switch(type) {
    case DETAIL_GET:
      return payload;
    default:
      return state;
  }
}