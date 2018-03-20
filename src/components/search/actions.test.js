jest.mock('../../services/googleAPI', () => ({
  getPlacesByTextSearch: jest.fn(() => Promise.resolve('PAYLOAD'))
}));

import { searchByKeyword } from './actions';
import { RESULTS_SET } from './reducers';

describe('search action tests: ', () => {
  it('gets places by text search', async() => {
    const dispatch = jest.fn();
    const results = searchByKeyword('columbia');
    await results(dispatch);
    
    expect(dispatch.mock.calls[0][0].type).toBe(RESULTS_SET);
    
  });
});