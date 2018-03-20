import { RESULTS_SET } from './reducers';
import { getPlacesByTextSearch, getPlacesByLocation } from '../../services/googleAPI';

export function searchByKeyword(query) {
  return dispatch => {
    getPlacesByTextSearch(encodeURI(query))
      .then(response => {
        dispatch({
          type: RESULTS_SET,
          payload: response
        });
      });
  };
}

export function searchByLocation(query) {
  return dispatch => {
    getPlacesByLocation(encodeURI(query))
      .then(response => {
        dispatch({
          type: RESULTS_SET,
          payload: response
        });
      });
  };
}

