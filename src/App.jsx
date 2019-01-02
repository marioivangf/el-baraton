import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import Root from "./containers/Root";
import rootReducer from "./reducers";

const store = createStore(rootReducer);
const persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

const rootElement = document.getElementById("root");
render(<App />, rootElement);
