import React, { FunctionComponent } from "react";

export interface NavbarMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
}

export const NavbarMenu: FunctionComponent<NavbarMenuProps> = ({ children, className, ...other }) => {
  return <ul className={`navbar-menu${className ? ` ${className}` : ''}`} {...other}>{children}</ul>
}

export interface NavbarActionsMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
}

export const NavbarActionsMenu: FunctionComponent<NavbarActionsMenuProps> = ({ children, className, ...other }) => {
  return <div className={`navbar-actions-menu${className ? ` ${className}` : ''}`} {...other}>{children}</div>
}

