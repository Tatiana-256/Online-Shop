import { takeLatest, put, all, call } from "redux-saga/effects";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
} from "../../firebase/firebase";
import { singInSuccess, singInFailure } from "./user.actions";

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

export function* onGoogleSignInStart() {
  yield takeLatest("GOOGLE_SIGH_IN_START", singInWithGoogle);
}

export function* singInWithMail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(singInFailure(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest("EMAIL_SIGH_IN_START", singInWithMail);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
