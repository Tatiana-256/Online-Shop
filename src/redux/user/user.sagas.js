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
} from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
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

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onUserSignOutStart),
  ]);
}
