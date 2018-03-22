export const USER_LOAD = 'USER_LOAD';


export function currentUser(state = null, { type, payload }) {
  switch(type) {
    case USER_LOAD:
      return payload;
    default:
      return state;
  }
}

