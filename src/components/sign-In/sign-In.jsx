import React from "react";

import FormInput from "../form-input/form-input";
// import { auth, signInWithGoogle } from "../../firebase/firebase.js";
import "./sign-In.scss";
import CustomButton from "../custom-button/custom-button";
import {
  googleSingInStart,
  emailSingInStart,
} from "../../redux/user/user.actions";
import { connect } from "react-redux";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handelSubmit = async (event) => {
    event.preventDefault();
    const { emailSingInStart } = this.props;
    const { email, password } = this.state;

    emailSingInStart(email, password);
    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    //   this.setState({
    //     email: "",
    //     password: "",
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  handleChange = (event) => {
    const { value, name } = event.currentTarget;

    this.setState({ [name]: value });
  };

  render() {
    const { googleSingInStart } = this.props;
    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handelSubmit}>
          <FormInput
            name="email"
            value={this.state.email}
            type="email"
            handleChange={this.handleChange}
            label="email"
            required
          />
          <FormInput
            name="password"
            value={this.state.password}
            type="password"
            handleChange={this.handleChange}
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
  }
}

const mapDispatchToProps = (dispatch) => ({
  googleSingInStart: () => {
    dispatch(googleSingInStart());
  },
  emailSingInStart: (email, password) => {
    dispatch(emailSingInStart({ email, password }));
  },
});

export default connect(null, mapDispatchToProps)(SignIn);
