export const USER_LOAD = 'USER_LOAD';
export const USER_REVIEWS_LOAD = 'USER_REVIEWS_LOAD';


export function currentUser(state = null, { type, payload }) {
  switch(type) {
    case USER_LOAD:
      return payload;
    default:
      return state;
  }
}

