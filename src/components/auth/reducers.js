export const USER_SET = 'USER_SET';

export function user(state = null, { type, payload }) {
  switch(type) {
    case USER_SET:
      return payload;
    default:
      return state;
  }
}