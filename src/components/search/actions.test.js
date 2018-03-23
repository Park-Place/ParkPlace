jest.mock('../../services/googleAPI', () => ({
  getPlacesByTextSearch: jest.fn(() => Promise.resolve('PAYLOAD')),
  getPlacesByLocation: jest.fn(() => Promise.resolve('PAYLOAD'))

}));

import { searchByKeyword, searchByLocation } from './actions';
import { RESULTS_SET } from './reducers';


describe('search action tests: ', () => {

  it('it creates search by keyword action', async() => {
    const dispatch = jest.fn();
    const results = searchByKeyword('columbia');
    await results(dispatch);
    
    expect(dispatch.mock.calls[0][0].type).toBe(RESULTS_SET);
    
  });

  it('it creates search by location action', async() => {
    const dispatch = jest.fn();
    const results = searchByLocation('Portland');
    await results(dispatch);
    
    expect(dispatch.mock.calls[0][0].type).toBe(RESULTS_SET);
    
  });
});