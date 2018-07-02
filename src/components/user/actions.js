import { onUserLoad } from '../../services/parkApi';
import { USER_LOAD } from './reducers';


let listening;

export function loadUser(id) {

  return dispatch => {
    if(listening === id) return;
    listening = id;
    onUserLoad(id, userInfo => {
      dispatch({
        type: USER_LOAD, 
        payload: userInfo
      });
    });
  };
}

