export const USER_SET = 'USER_SET';

// You don't need both of these, they would be in same state.

export function user(state = null, { type, payload }) {
  switch(type) {
    case USER_SET:
      return payload;
    default:
      return state;
  }
}

export function checkedUser(state = false, { type }) {
  switch(type) {
    case USER_SET:
      return true;
    default:
      return state;
  }
}