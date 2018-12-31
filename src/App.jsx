import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import CategoriesView from "./containers/CategoriesView";
import CategoryView from "./containers/CategoryView";
import Cart from "./containers/Cart";
import rootReducer from "./reducers";

const store = createStore(rootReducer);
const persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <div>
          <div><Cart /></div>
          <Switch>
            <Route exact path="/"><Redirect to="/categories" /></Route>
            <Route exact path="/categories" component={CategoriesView} />
            <Route path="/categories/:ids*" component={CategoryView} />
          </Switch>
        </div>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

const rootElement = document.getElementById("root");
render(<App />, rootElement);
