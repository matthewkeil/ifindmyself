import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import { CoreState } from "./state";
import { CORE, CoreActions } from "./actions";
import storage from "./storage";

const coreReducer = (
  state: CoreState = {} as CoreState,
  action: CoreActions
): CoreState => {
  switch (action.type) {
    case CORE.TOGGLE_NAV:
      return {
        ...state,
        nav: { ...state.nav, open: action.payload || !state.nav.open }
      };
    case CORE.LOGIN:
      storage.setUser(action.payload);
      return { ...state, user: action.payload };
    case CORE.LOGOUT:
      storage.setUser();
      return { ...state, user: undefined };
    default:
      return state;
  }
};

export default combineReducers({
  core: coreReducer,
  router: routerReducer
});
