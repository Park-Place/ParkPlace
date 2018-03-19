import { SUBMIT_REVIEW } from './reducers';

export function userReview(review) {
  return (dispatch) => {
    dispatch({
      type: SUBMIT_REVIEW,
      payload: review
    });
  };
}