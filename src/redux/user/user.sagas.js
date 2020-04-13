import { takeLatest, put, all, call } from "redux-saga/effects";
import { googleSingInStart } from "./user.actions";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
} from "../../firebase/firebase";

export function* singInWithGoogle() {
  try {
    const userRef = yield auth.singInWithPopup(googleProvider);
  } catch (error) {}
}

export function* onGoogleSignInStart() {
  yield takeLatest("GOOGLE_SIGH_IN_START");
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
}
