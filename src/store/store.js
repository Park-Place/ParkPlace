import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './promiseMiddleware';
import { searchResults } from '../components/search/reducers';
import { loading, error } from '../components/app/reducers';
import { currentPark, currentParkReviews } from '../components/parkDetail/reducers';
import { user as loggedIn, checkedUser } from '../components/auth/reducers';
import { currentUser } from '../components/user/reducers';

const reducer = combineReducers({
  searchResults,
  currentPark,
  currentUser,
  loggedIn,
  currentParkReviews,
  checkedUser,
  loading,
  error
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk, promiseMiddleware) 
  )
);

export default store;