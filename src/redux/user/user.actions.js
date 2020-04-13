export const setCurrentUser = (user) => ({
  type: "SET_CURRENT_USER",
  payload: user,
});

export const googleSingInStart = () => ({
  type: "GOOGLE_SIGH_IN_START",
});

export const googleSingInSuccess = (user) => ({
  type: "GOOGLE_SIGH_IN_SUCCESS",
  payload: user,
});

export const googleSingInFailure = (error) => ({
  type: "GOOGLE_SIGH_IN_FAILURE",
  payload: error,
});

export const emailSingInStart = (emailAndPassword) => ({
  type: "EMAIL_SIGH_IN_START",
  payload: emailAndPassword,
});

export const emailSingInSuccess = (user) => ({
  type: "EMAIL_SIGH_IN_SUCCESS",
  payload: user,
});

export const emailSingInFailure = (error) => ({
  type: "EMAIL_SIGH_IN_FAILURE",
  payload: error,
});
