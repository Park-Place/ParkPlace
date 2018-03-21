import { db } from '../../services/firebase';
import { onUserLoad, onUserReviewsLoad } from '../../services/parkApi';
import { USER_LOAD, USER_REVIEWS_LOAD } from './reducers';

const users = db.ref('users');


export function loadUser(id) {

  return dispatch => {

    onUserLoad(id, userInfo => {
      dispatch({
        type: USER_LOAD, 
        payload: userInfo
      });
    });
  };
}

