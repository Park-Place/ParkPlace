import { getParkDetail } from '../../services/googleAPI';
import { DETAIL_GET } from './reducers';

export function getParkById(id) {

  return dispatch => {
    dispatch({
      type: DETAIL_GET,
      payload: getParkDetail(id)
    });
  };
}
