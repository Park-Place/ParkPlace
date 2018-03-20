import { user } from './reducers';

describe('User tests', () => {

  it('sets default user state to empty string', () => {
    const state = user(undefined, {});
    expect(state).toEqual(null);
  });

  it('assigns user object', () => {
    const state = user({}, {});
    expect(state).toEqual({});
  });

});