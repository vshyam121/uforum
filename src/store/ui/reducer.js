import * as actionTypes from './actionTypes';

export const initialState = {
  erroredAction: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //set action that produced the error
    case actionTypes.SET_ERRORED_ACTION:
      return {
        ...state,
        erroredAction: action.erroredAction,
      };
    default:
      return state;
  }
};

export default reducer;
