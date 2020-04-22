import { takeLatest, put, all, call } from "redux-saga/effects";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase";
import {
  singInSuccess,
  singInFailure,
  singOutSuccess,
  singOutFailure,
  singUpSuccess,
  singUpFailure,
} from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(singInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(singInFailure(error));
  }
}

export function* singInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(singInFailure(error));
  }
}

export function* singInWithMail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(singInFailure(error));
  }
}

export function* inUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(singInFailure(error));
  }
}

export function* singOut() {
  try {
    yield auth.signOut();
    yield put(singOutSuccess());
  } catch (error) {
    yield put(singOutFailure(error));
  }
}

export function* singUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(singUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(singUpFailure(error));
  }
}

export function* singInAfterSingUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

// _______SAGAS WITH START ACTIONS_________________

export function* onGoogleSignInStart() {
  yield takeLatest("GOOGLE_SIGH_IN_START", singInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest("EMAIL_SIGH_IN_START", singInWithMail);
}
export function* onCheckUserSession() {
  yield takeLatest("CHECK_USER_SESSION", inUserAuthenticated);
}

export function* onUserSignOutStart() {
  yield takeLatest("SIGH_OUT_START", singOut);
}

export function* onUserSignUpStart() {
  yield takeLatest("SIGH_UP_START", singUp);
}

export function* onUserSignUpSuccess() {
  yield takeLatest("SIGH_UP_SUCCESS", singInAfterSingUp);
}
// ______Combine sagas______________

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onUserSignOutStart),
    call(onUserSignUpStart),
    call(onUserSignUpSuccess),
  ]);
}
