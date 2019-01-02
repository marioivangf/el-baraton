import React, { Fragment, useState } from "react";
import Cart from "../containers/Cart";

const NavBar = () => {
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
        <div className="full row wrapper --center">
          <div className="flex1">El Baratón</div>
          <Cart />
        </div>
      </div>
    </Fragment>
  );
};

export default NavBar;
