import React from "react";
import "./signIn-signUp.scss";
import SignIn from "../../components/sign-In/sign-In";
import SignUp from "../../components/sign-up/sign-up";

const SignInSignUpPage = () => (
  <div className="sign-in-and-sign-up">
    <SignIn />
    <SignUp />
  </div>
);

export default SignInSignUpPage;
