const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGH_IN_SUCCESS":
      return { ...state, currentUser: action.payload, error: null };
    case "SIGH_OUT_SUCCESS":
      return { ...state, currentUser: null, error: null };
    case "SIGH_IN_FAILURE":
    case "SIGH_OUT_FAILURE":
    case "SIGH_UP_FAILURE":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
