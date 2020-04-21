import { all, call, takeLatest, put } from "redux-saga/effects";
import { clearCart } from "./cart.action";

export function* clearCartOnSingOut() {
  yield put(clearCart());
}

export function* onSingOutSuccess() {
  yield takeLatest("SIGH_OUT_SUCCESS", clearCartOnSingOut);
}

export function* cartSagas() {
  yield all([call(onSingOutSuccess)]);
}
