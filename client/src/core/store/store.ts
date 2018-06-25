import { createStore, Store } from "redux";
import { History } from "history";

import reducers from "./reducers";
import middleware from "./middleware";
import { initialState, State } from "./state";

export let store: Store<State>;

export const configureStore = (history: History) => {
  store = createStore(reducers, initialState, middleware(history));
  return store;
};
