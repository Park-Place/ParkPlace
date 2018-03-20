import { RESULTS_SET } from './reducers';
import { getPlacesByTextSearch } from '../../services/googleAPI';

export function searchByKeyword(query) {
  console.log('AFTER function call!!!!');

  return dispatch => {
    console.log('AFTER dispatch');
    getPlacesByTextSearch(encodeURI(query))

      .then(response => {
        console.log('response', response);

        dispatch({
          type: RESULTS_SET,
          payload: response
        });
      });
  };
}

export function searchByLocation(query) {
  console.log('AFTER function call!!!!');

  return dispatch => {
    console.log('AFTER DISPATCH!!!!');
    getPlacesByTextSearch(encodeURI(query))
      .then(response => {
        console.log('AFTER then!!!!');

        dispatch({
          type: RESULTS_SET,
          payload: response
        });
      });
  };
}

