export const GET_DETAIL = 'GET_DETAIL';

export function detailResult(state = [], { type, payload }) {
  switch(type) {
    case GET_DETAIL:
      return payload;
    default:
      return state;
  }

}