import * as actionTypes from './actionTypes';
import axios from '../../axiosAPI';
import { history } from '../../index';

/* To show loading in UI when authentication action has started */
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

/* Reset auth error after unmounting an auth component */
export const authReset = () => {
  return {
    type: actionTypes.AUTH_RESET,
  };
};

/* Failed to initialize app */
export const authTokenFailed = () => {
  return {
    type: actionTypes.AUTH_TOKEN_FAILED,
  };
};

/* Successfully authenticated user and received token/userid */
export const authSuccess = (authData) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.AUTH_SUCCESS, user: authData.user });

    //Set automatic sign out
    dispatch(checkAuthTimeout(authData.expires));
  };
};

/* Set error to be displayed in UI when authentication has failed */
export const signInFailed = (error) => {
  return {
    type: actionTypes.SIGN_IN_FAILED,
    error: error,
  };
};

/* Set error to be displayed in UI when authentication has failed */
export const signUpFailed = (error) => {
  return {
    type: actionTypes.SIGN_UP_FAILED,
    error: error,
  };
};

/* Clear user data and cart on sign out */
export const signOut = () => {
  return (dispatch) => {
    return axios.post('/auth/signout', {}).then(() => {
      dispatch({
        type: actionTypes.AUTH_SIGNOUT,
      });

      history.push({ pathname: '/', fromSignOut: true });
    });
  };
};

/* Sign out user when expiration time has been reached */
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    //Calculate time to expire based on exact time of expiration
    let timeToExpire = expirationTime - new Date().getTime();

    //Dispatch sign out action in time to expire
    setTimeout(() => {
      dispatch(signOut());
    }, timeToExpire);
  };
};

/* Sign in user with email/password.
   Also get user's cart and orders once successfully signed in */
export const signIn = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      username: username,
      password: password,
    };
    return axios
      .post('/auth/signin', authData)
      .then((res) => {
        //Successful authentication, get user's data here
        dispatch(authSuccess(res.data));
      })
      .catch((err) => {
        if (err.response) {
          dispatch(signInFailed(err.response));
        } else {
          dispatch(signInFailed(null));
        }
      });
  };
};

/* Sign up user with email/password */
export const signUp = (firstName, lastName, email, username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    };
    return axios
      .post('/auth/signup', authData)
      .then((res) => {
        //Successful authentication, get user's data here
        dispatch(authSuccess(res.data));
      })
      .catch((err) => {
        if (err.response) {
          dispatch(signUpFailed(err.response));
        } else {
          dispatch(signUpFailed(null));
        }
      });
  };
};

/* Initialize application upon app load */
export const authenticateToken = () => {
  return (dispatch) => {
    dispatch(authStart());
    return axios
      .get('/auth/me')
      .then((res) => {
        //Successful authentication, get user's data here
        dispatch(authSuccess(res.data));
      })
      .catch(() => {
        dispatch(authTokenFailed());
      });
  };
};
