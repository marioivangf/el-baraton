import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { Home } from "./containers";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route exact path="/" component={Home} />
    </BrowserRouter>
  </Provider>
);

const rootElement = document.getElementById("root");
render(<App />, rootElement);
