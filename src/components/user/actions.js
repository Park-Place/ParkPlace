import { db } from '../../services/firebase';
import { onUserLoad } from '../../services/parkApi';
import { USER_LOAD } from './reducers';

const users = db.ref('users');


export function UserLoad(id) {

  return dispatch => {

    onUserLoad(id, userInfo => {
      dispatch({
        type: USER_LOAD, 
        payload: userInfo
      });
    });
  };
}

