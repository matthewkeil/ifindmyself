import * as React from "react";
// import { connect, Dispatch, MapStateToProps } from "react-redux";
import { Switch, Route } from "react-router-dom";

import "./App.css";
// import AppDrawer from "./common/AppDrawer";
import Needs from "./needs";

export default class App extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/needs" component={Needs} />
        </Switch>
      </>
    );
  }
}

// export default connect<StateProps, DispatchProps>(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);
