import * as React from "react";
import { Dispatch, connect } from "react-redux";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";

import { default as Appbar } from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";

import * as styles from "./AppDrawer.scss";
import { State, Actions } from "../../core/store";

import DrawerContents from "../DrawerContents/DrawerContents";

class AppDrawer extends React.Component<Props> {
  render() {
    const { user, drawerOpen, openDrawer, closeDrawer } = this.props;

    return (
      <>
        <Appbar styleName="appBar">
          <Toolbar>
            <Link to="/">
              <span>i find myself</span>
            </Link>
            <span styleName="spacer" />
            <IconButton aria-label="open drawer" onClick={openDrawer}>
              {!!user ? <MenuIcon /> : <AccountCircle />}
            </IconButton>
          </Toolbar>
        </Appbar>
        <Drawer anchor="bottom" open={drawerOpen} onClose={closeDrawer}>
          <DrawerContents items={this.props.drawerItems} />
        </Drawer>
      </>
    );
  }
}

const mapStateToProps = (state: State) => ({
  drawerItems: state.core.nav.items,
  drawerOpen: state.core.nav.open,
  user: state.core.user
});
type StateProps = ReturnType<typeof mapStateToProps>;
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeDrawer: () => void dispatch(Actions.core.toggleNav(false)),
  openDrawer: () => void dispatch(Actions.core.toggleNav(true))
});
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CSSModules(AppDrawer, styles));
