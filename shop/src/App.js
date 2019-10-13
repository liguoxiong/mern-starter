import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import configureStore, { history } from "./appRedux/store/index";
import AppRoute from "./Route";

export const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <AppRoute></AppRoute>
        </>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
