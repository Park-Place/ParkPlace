import { RESULTS_SET } from './reducers';
import { getPlacesByTextSearch } from '../../services/googleAPI';

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
    getPlacesByTextSearch(encodeURI(query))
      .then(response => {
        dispatch({
          type: RESULTS_SET,
          payload: response
        });
      });
  };
}

