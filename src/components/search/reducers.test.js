import { RESULTS_SET, searchResults } from './reducers';

describe('search results', () => {
  it('gives results', () => {
    const state = searchResults([], { type: RESULTS_SET, payload: { query: 'columbia' } });
    expect(state).toEqual({ query: 'columbia' });

  });

});