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
