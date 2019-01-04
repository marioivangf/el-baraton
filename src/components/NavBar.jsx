import React, { Fragment, useState, PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Cart from "../containers/Cart";

const NavBar = ({ quantityInCart }) => {
  const [cartHidden, toggleCart] = useState(true);
  const onClick = () => {
    document.body.classList.toggle("--cart-opened");
    toggleCart(!document.body.classList.contains("--cart-opened"));
  };
  let buttonClasses = "button --icon";
  if (!cartHidden) buttonClasses += " --active";
  return (
    <Fragment>
      <div className="nav-bar">
        <div className="nav-bar-wrapper row --center">

          <Link to="/" className="flex1 nav-bar-logo">El Baratón</Link>
          <button type="button" className={buttonClasses} onClick={onClick}>
            {(quantityInCart !== 0) && <span>({ quantityInCart })</span>}
            <i className="material-icons">shopping_cart</i>
          </button>
        </div>
      </div>
      <Cart hidden={cartHidden} />
    </Fragment>
  );
};

class Intermediary extends PureComponent {
  render () {
    return <NavBar {...this.props} />;
  }
}

const mapStateToProps = ({ cart }) => {
  const quantityInCart = Object.values(cart).reduce((a, b) => a + b, 0);
  return { quantityInCart };
};

export default connect(mapStateToProps, null)(Intermediary);
