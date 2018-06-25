import { compose, applyMiddleware, StoreEnhancer } from "redux";
import thunk from "redux-thunk";
// import { createEpicMiddleware } from "redux-observable";
import { routerMiddleware } from "react-router-redux";
import { History } from "history";

// import epics from "./epics";

const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const actionToPlainObject = (store: any) => (next: any) => (action: any) =>
  next({ ...action });

const configureMiddleware = (history: History): StoreEnhancer =>
  composeEnhancers(
    applyMiddleware(
      actionToPlainObject,
      thunk,
      // createEpicMiddleware(epics),
      routerMiddleware(history)
    )
  );

export default configureMiddleware;
