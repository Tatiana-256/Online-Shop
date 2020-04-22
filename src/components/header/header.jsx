import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

import "./header.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg.svg";
import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { singOutStart } from "../../redux/user/user.actions";

const Header = ({ currentUser, hidden, singOutStart }) => (
  <div className="header">
    <Link to="/" className="logo-container">
      <Logo className="logo"></Logo>
    </Link>
    <div className="options">
      <Link className="option" to="/">
        Shop
      </Link>
      <Link className="option" to="/shop">
        Contact
      </Link>
      {currentUser ? (
        <div className="option" onClick={singOutStart}>
          Sign out
        </div>
      ) : (
        <Link className="option" to="/signin">
          Sign in
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  singOutStart: () => {
    dispatch(singOutStart());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
