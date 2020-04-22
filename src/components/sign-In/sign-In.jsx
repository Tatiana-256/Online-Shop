import React from "react";
import { connect } from "react-redux";
import { useState } from "react";

import FormInput from "../form-input/form-input";
import "./sign-In.scss";
import CustomButton from "../custom-button/custom-button";
import {
  googleSingInStart,
  emailSingInStart,
} from "../../redux/user/user.actions";

const SignIn = ({ emailSingInStart, googleSingInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handelSubmit = async (event) => {
    event.preventDefault();
    emailSingInStart(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.currentTarget;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2 className="title">I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handelSubmit}>
        <FormInput
          name="email"
          value={email}
          type="email"
          handleChange={handleChange}
          label="email"
          required
        />
        <FormInput
          name="password"
          value={password}
          type="password"
          handleChange={handleChange}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton
            type="button"
            onClick={googleSingInStart}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSingInStart: () => {
    dispatch(googleSingInStart());
  },
  emailSingInStart: (email, password) => {
    dispatch(emailSingInStart({ email, password }));
  },
});

export default connect(null, mapDispatchToProps)(SignIn);
