import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import { bubblesReducer as reducer } from "./reducers/bubblesReducer";
import BubblePage from "./components/BubblePage";
import thunk from "redux-thunk";
import logger from "redux-logger";
import "./styles.scss";
const store = createStore(reducer, applyMiddleware(thunk, logger));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/bubbles" component={BubblePage} />
            <Route exact path="/" component={Login} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
