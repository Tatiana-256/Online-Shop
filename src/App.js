import React from "react";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import { Switch, Route } from "react-router-dom";
import ShopPage from "./pages/shop/shop";
import Header from "./components/header/header";
import SignInSignUpPage from "./pages/signIn-signUp/signIn-signUp";
import { auth } from "./firebase/firebase.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = { currentUser: null };
  }

  unSubscriberFromAuth = null;

  componentDidMount() {
    this.unSubscriberFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unSubscriberFromAuth();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
