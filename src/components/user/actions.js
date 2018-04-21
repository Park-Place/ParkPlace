import { onUserLoad } from '../../services/parkApi';
import { USER_LOAD } from './reducers';


let prevId;

export function loadUser(id) {

  return dispatch => {
    if(prevId === id) return;
    
    onUserLoad(id, prevId, userInfo => {
      dispatch({
        type: USER_LOAD, 
        payload: userInfo
      });
    });
    prevId = id;
  };
}

