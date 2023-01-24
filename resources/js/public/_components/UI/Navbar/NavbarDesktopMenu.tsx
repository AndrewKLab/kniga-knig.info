import React, { FunctionComponent } from "react";

export interface NavbarDesktopMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
}

export const NavbarDesktopMenu: FunctionComponent<NavbarDesktopMenuProps> = ({ children, className, ...other }) => {
  return <div className={`navbar-desktop-menu${className ? ` ${className}` : ''}`} {...other}>{children}</div>
}

