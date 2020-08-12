import * as actionTypes from './actionTypes';

/* set error for withErrorHandler HOC to pickup */
export const setErroredAction = (erroredAction) => {
  return {
    type: actionTypes.SET_ERRORED_ACTION,
    erroredAction: erroredAction,
  };
};
