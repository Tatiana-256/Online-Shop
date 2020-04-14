export const googleSingInStart = () => ({
  type: "GOOGLE_SIGH_IN_START",
});

export const emailSingInStart = (emailAndPassword) => ({
  type: "EMAIL_SIGH_IN_START",
  payload: emailAndPassword,
});

export const singInSuccess = (user) => ({
  type: "SIGH_IN_SUCCESS",
  payload: user,
});

export const singInFailure = (error) => ({
  type: "SIGH_IN_FAILURE",
  payload: error,
});

export const checkUserSession = () => ({
  type: "CHECK_USER_SESSION",
});

export const singOutStart = () => ({
  type: "SIGH_OUT_START",
});

export const singOutSuccess = () => ({
  type: "SIGH_OUT_SUCCESS",
});

export const singOutFailure = (error) => ({
  type: "SIGH_OUT_FAILURE",
  payload: error,
});
