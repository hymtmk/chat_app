import {FETCHING_DATA} from './actionType'
import {INVITING_DATA} from './actionType'
import {FETCHING_PROFILE} from './actionType'
import {FETCHING_PROFILE_SUCCESS} from './actionType'
import {FETCHING_PROFILE_FAILURE} from './actionType'


//test saga
export function fetchData() {
  return {
    type: FETCHING_DATA
  }
}

//invite action
export function inviteData (from, to) {  

  return {
    type: INVITING_DATA,
    from,
    to,
  }
}

export const loginUser = (email, password) => dispatch => {
  dispatch(requestLogin());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(receiveLogin(user));
    })
    .catch(error => {
      //Do something with the error if you want!
      dispatch(loginError());
    });
};

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch(error => {
      //Do something with the error if you want!
      dispatch(logoutError());
    });
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  myFirebase.auth().onAuthStateChanged(user => {
    if (user !== null) {
      dispatch(receiveLogin(user));
    }
    dispatch(verifySuccess());
  });
};