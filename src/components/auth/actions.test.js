// jest.mock('../../services/gameApi', () => ({
//   onUserStateChange: jest.fn(handler => {
//     handler({});
//   }),
//   onSignUp: jest.fn((email, password) => {
//     return { email, password };
//   }),
//   onSignIn: jest.fn((email, password) => {
//     return { email, password };
//   }),
//   onSignOut: jest.fn(() => {})

// }));

import { USER_SET } from './reducers';
import { listenForUser, signup, signin, logout } from './actions';

describe('user actions', () => {
  it('listens for a user change', () => {
    const thunk = listenForUser();
    expect(typeof thunk).toBe('function');
    const dispatch = jest.fn();
    thunk(dispatch);

    expect(dispatch).toBeCalledWith({
      type: USER_SET,
      payload: {}
    });
  });

  it('signs a user up', () => {
    const user = {
      email: 'me@me.com',
      password: '123'
    };
    const thunk = signup(user);
    const dispatch = jest.fn();

    expect(typeof thunk).toBe('function');
    expect(thunk(dispatch)).toEqual(user);
  });

  it('signs in a user', () => {
    const user = {
      email: 'me@me.com',
      password: '123'
    };
    const thunk = signin(user);
    const dispatch = jest.fn();

    expect(typeof thunk).toBe('function');
    expect(thunk(dispatch)).toEqual(user);
  });

  it('logs out a user', () => {
    const thunk = logout();
    expect(typeof thunk).toBe('function');
    const dispatch = jest.fn();
    expect(thunk(dispatch)).toEqual(undefined);
    
  });
});