import React, { useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import CategoriesView from "./CategoriesView";
import CategoryView from "./CategoryView";
import NavBar from "../components/NavBar";

const Root = ({ location }) => {
  return (
    <div className="root-wrapper">
      <NavBar />
      <TransitionGroup className="content-wrapper">
        <CSSTransition key={location.key} classNames="page-trans" timeout={250}>
          <Switch location={location}>
            <Route exact path="/" component={CategoriesView} />
            <Route path="/cat/:ids*" component={CategoryView} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default withRouter(Root);
