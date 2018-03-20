import { RESULTS_SET } from './reducers';
import { getPlacesByTextSearch, getPlacesByLocation } from '../../services/googleAPI';

export function searchByKeyword(query) {

  return dispatch => {
    dispatch({
      type: RESULTS_SET,
      payload: getPlacesByTextSearch(encodeURI(query))
    });
  };
}


export function searchByLocation(query) {

  return dispatch => {
    dispatch({
      type: RESULTS_SET,
      payload: getPlacesByLocation(encodeURI(query))
    });
  };
}

