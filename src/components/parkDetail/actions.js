import { getParkDetail } from '../../services/googleAPI';
import { GET_DETAIL } from './reducers';

export function getParkById(id) {

  return dispatch => {
    dispatch({
      type: GET_DETAIL,
      payload: getParkDetail(id)
    });
  };
}
