import * as React from "react";
import { NavItemProps } from "../../common/NavItem/NavItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { RouterState } from "react-router-redux";
import storage from "./storage";

const initialCoreState = {
  nav: {
    items: [
      {
        icon: <AccountCircle />,
        primaryText: "Login",
        url: "/auth/login"
      },
      {
        icon: <MenuIcon />,
        primaryText: "Sign Up",
        url: "/auth/register"
      }
    ] as NavItemProps[],
    open: false
  },
  user: storage.getUser()
};

export type CoreState = typeof initialCoreState;

export interface State {
  core: CoreState;
  router: RouterState;
}
export const initialState: Partial<State> = {
  core: initialCoreState
};
