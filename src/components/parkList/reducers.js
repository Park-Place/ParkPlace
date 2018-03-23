export const RESULTS_SET = 'RESULTS_SET';


export function searchResults(state = null, { type, payload }) {
  switch(type) {
    case RESULTS_SET:
      return payload;
    default:
      return state;
  }
}
