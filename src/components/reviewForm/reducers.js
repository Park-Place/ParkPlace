export const SUBMIT_REVIEW = 'SUBMIT_REVIEW';

export const initialState = {
  review: '',
  parkType: '',
  rating: '',
  parking: '',
  timeOfYear: ''
};

export function reviews(state = initialState, { type, payload }) {
  switch(type) {
    case SUBMIT_REVIEW: {

      return { 
        payload
      };

    }
    default:
      return state;
  }
}