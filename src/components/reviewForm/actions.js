import { SUBMIT_REVIEW } from './reducers';
import { save } from '../../services/reviewApi';

export function userReview(review) {
  return (dispatch) => {
    
    console.log(review);
    dispatch({
      type: SUBMIT_REVIEW,
      payload: save(review).then(({ name }) => {
        review.key = name;
        return review;
      })
    });
  };
}