import React from "react";
import { SpinnerOverlay } from "../with-spinner/with-spinner.styles";
import { SpinnerContainer } from "../with-spinner/with-spinner.styles";

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
