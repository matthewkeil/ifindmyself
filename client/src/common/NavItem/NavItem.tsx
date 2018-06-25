import * as React from "react";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CSSModules from "react-css-modules";

import * as styles from "./NavItem.scss";

export interface NavItemProps {
  icon: JSX.Element;
  primaryText: string;
  url: string;
}

const NavItem: React.SFC<NavItemProps> = ({ icon, primaryText, url }) => (
  <ListItem component={Link} disableGutters>
    <ListItemIcon>
      <div styleName="icon">{icon}</div>
    </ListItemIcon>
    <ListItemText primary={primaryText} />
  </ListItem>
);

export default CSSModules(NavItem, styles);

// <ListItem className={classes.navLink} disableGutters>
//   <Button
//     component={Link}
//     variant="button"
//     href={href}
//     activeClassName={classes.activeButton}
//     className={classNames(classes.button, classes.navLinkButton)}
//     disableRipple
//     onClick={this.props.onClick}
//   >
//     {title}
//   </Button>
// </ListItem>;
