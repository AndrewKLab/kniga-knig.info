import React, { FunctionComponent } from "react";

export interface NavbarMobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
}

export const NavbarMobileMenu: FunctionComponent<NavbarMobileMenuProps> = ({ children, className, ...other }) => {
  return <div className={`navbar-mobile-menu${className ? ` ${className}` : ''}`} {...other}>{children}</div>
}

