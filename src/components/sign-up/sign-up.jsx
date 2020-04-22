import React, { useState } from "react";
import { connect } from "react-redux";

import "./sign-up.scss";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { singUpStart } from "../../redux/user/user.actions";

const SignUp = ({ singUpStart }) => {
  const [userCredentials, setCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handelSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don`t match");
      return;
    }

    singUpStart({ displayName, email, password });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <form className="sign-up-form" onSubmit={handelSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Display email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm password"
          required
        />
        <CustomButton type="submit">Sign up</CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  singUpStart: (userCredentials) => dispatch(singUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
