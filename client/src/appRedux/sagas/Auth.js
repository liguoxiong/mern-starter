import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  auth,
  facebookAuthProvider,
  githubAuthProvider,
  googleAuthProvider,
  twitterAuthProvider,
} from '../../firebase/firebase';
import api from './../../api';
import {
  SIGNIN_FACEBOOK_USER,
  SIGNIN_GITHUB_USER,
  SIGNIN_GOOGLE_USER,
  SIGNIN_TWITTER_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER,
  GET_USER,
} from 'constants/ActionTypes';
import {
  showAuthMessage,
  userSignInSuccess,
  userSignOutSuccess,
  userSignUpSuccess,
  getUserSuccess,
} from '../../appRedux/actions/Auth';
import {
  userFacebookSignInSuccess,
  userGithubSignInSuccess,
  userGoogleSignInSuccess,
  userTwitterSignInSuccess,
} from '../actions/Auth';

const getUser = async () =>
  await api.user
    .current()
    .then(user => user)
    .catch(error => error);

function* getUserFromToken() {
  try {
    const res = yield call(getUser);
    if (res.message) {
      yield put(showAuthMessage(res.message));
    } else {
      localStorage.setItem('user_id', res.user._id);
      yield put(getUserSuccess(res.user));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

const createUserWithEmailPasswordRequest = async (email, password) =>
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);

const registerUser = async user =>
  await api.user
    .register(user)
    .then(user => user)
    .catch(error => error);

function* createUserWithUserNamePassword({ payload }) {
  const { remember, ...rst } = payload;
  try {
    const signUpUser = yield call(registerUser, rst);
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message));
    } else {
      localStorage.setItem('user_id', signUpUser.user._id);
      yield put(userSignUpSuccess(signUpUser.user));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

const loginUser = async (userName, password) =>
  await api.user
    .login(userName, password)
    .then(user => user)
    .catch(error => error);

function* signInUserWithUserNamePassword({ payload }) {
  const { userName, password } = payload;
  try {
    const signInUser = yield call(loginUser, userName, password);
    if (signInUser.message) {
      yield put(showAuthMessage(signInUser.message));
    } else {
      localStorage.setItem('user_id', signInUser.user._id);
      yield put(userSignInSuccess(signInUser.user));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

const logoutUser = async () =>
  await api.user
    .logout()
    .then(user => user)
    .catch(error => error);

function* signOut() {
  try {
    const signOutUser = yield call(logoutUser);
    if (signOutUser.success) {
      localStorage.removeItem('user_id');
      yield put(userSignOutSuccess(signOutUser));
    } else {
      yield put(showAuthMessage(signOutUser.message));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

// const signInUserWithEmailPasswordRequest = async (email, password) =>
//   await auth
//     .signInWithEmailAndPassword(email, password)
//     .then(authUser => authUser)
//     .catch(error => error);

// const signOutRequest = async () =>
//   await auth
//     .signOut()
//     .then(authUser => authUser)
//     .catch(error => error);

const signInUserWithGoogleRequest = async () =>
  await auth
    .signInWithPopup(googleAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithFacebookRequest = async () =>
  await auth
    .signInWithPopup(facebookAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithGithubRequest = async () =>
  await auth
    .signInWithPopup(githubAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithTwitterRequest = async () =>
  await auth
    .signInWithPopup(twitterAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

// function* createUserWithEmailPassword({ payload }) {
//   const { email, password } = payload;
//   try {
//     const signUpUser = yield call(createUserWithEmailPasswordRequest, email, password);
//     if (signUpUser.message) {
//       yield put(showAuthMessage(signUpUser.message));
//     } else {
//       localStorage.setItem('user_id', signUpUser.user.uid);
//       yield put(userSignUpSuccess(signUpUser.user.uid));
//     }
//   } catch (error) {
//     yield put(showAuthMessage(error));
//   }
// }

function* signInUserWithGoogle() {
  try {
    const signUpUser = yield call(signInUserWithGoogleRequest);
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message));
    } else {
      localStorage.setItem('user_id', signUpUser.user.uid);
      yield put(userGoogleSignInSuccess(signUpUser.user.uid));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signInUserWithFacebook() {
  try {
    const signUpUser = yield call(signInUserWithFacebookRequest);
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message));
    } else {
      localStorage.setItem('user_id', signUpUser.user.uid);
      yield put(userFacebookSignInSuccess(signUpUser.user.uid));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signInUserWithGithub() {
  try {
    const signUpUser = yield call(signInUserWithGithubRequest);
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message));
    } else {
      localStorage.setItem('user_id', signUpUser.user.uid);
      yield put(userGithubSignInSuccess(signUpUser.user.uid));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signInUserWithTwitter() {
  try {
    const signUpUser = yield call(signInUserWithTwitterRequest);
    if (signUpUser.message) {
      if (signUpUser.message.length > 100) {
        yield put(showAuthMessage('Your request has been canceled.'));
      } else {
        yield put(showAuthMessage(signUpUser.message));
      }
    } else {
      localStorage.setItem('user_id', signUpUser.user.uid);
      yield put(userTwitterSignInSuccess(signUpUser.user.uid));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

// function* signInUserWithEmailPassword({ payload }) {
//   const { email, password } = payload;
//   try {
//     const signInUser = yield call(signInUserWithEmailPasswordRequest, email, password);
//     if (signInUser.message) {
//       yield put(showAuthMessage(signInUser.message));
//     } else {
//       localStorage.setItem('user_id', signInUser.user.uid);
//       yield put(userSignInSuccess(signInUser.user.uid));
//     }
//   } catch (error) {
//     yield put(showAuthMessage(error));
//   }
// }

export function* createUserAccount() {
  yield takeEvery(SIGNUP_USER, createUserWithUserNamePassword);
}

export function* getUserAccount() {
  yield takeEvery(GET_USER, getUserFromToken);
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithUserNamePassword);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export function* signInWithGoogle() {
  yield takeEvery(SIGNIN_GOOGLE_USER, signInUserWithGoogle);
}

export function* signInWithFacebook() {
  yield takeEvery(SIGNIN_FACEBOOK_USER, signInUserWithFacebook);
}

export function* signInWithTwitter() {
  yield takeEvery(SIGNIN_TWITTER_USER, signInUserWithTwitter);
}

export function* signInWithGithub() {
  yield takeEvery(SIGNIN_GITHUB_USER, signInUserWithGithub);
}

export default function* rootSaga() {
  yield all([
    fork(signInUser),
    fork(createUserAccount),
    fork(signInWithGoogle),
    fork(signInWithFacebook),
    fork(signInWithTwitter),
    fork(signInWithGithub),
    fork(signOutUser),
    fork(getUserAccount),
  ]);
}
