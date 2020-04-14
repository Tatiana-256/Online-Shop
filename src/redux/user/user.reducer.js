const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGH_IN_SUCCESS":
      return { ...state, currentUser: action.payload, error: null };
    case "SIGH_IN_FAILURE":
      return { ...state, error: action.payload };
    case "CHECK_USER_SESSION":
      return { ...state };
    default:
      return state;
  }
};

export default userReducer;
