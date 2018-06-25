import * as React from "react";
import NavItem, { NavItemProps } from "../NavItem/NavItem";
import List from "@material-ui/core/List";

export interface DrawerProps {
  items: NavItemProps[];
}

const DrawerContents: React.SFC<DrawerProps> = ({ items }) => (
  <List component="nav">
    {items.map((props, index) => <NavItem key={index} {...props} />)}
  </List>
);

export default DrawerContents;
