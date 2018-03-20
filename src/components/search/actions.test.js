jest.mock('../../services/googleAPI', () => ({
  getPlacesByTextSearch: jest.fn(() => Promise.resolve('PAYLOAD'))
}));

import { searchByKeyword } from './actions';
import { RESULTS_SET } from './reducers';

describe('search action tests: ', () => {
  it('gets places by text search', () => {
    const dispatch = jest.fn();

    expect(dispatch.mock.calls.length).toBe(1);
  })
})