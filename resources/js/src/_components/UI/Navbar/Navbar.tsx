import React, { FunctionComponent } from "react";

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
}

export const Navbar: FunctionComponent<NavbarProps> = ({ children, className, ...other }) => {
  return <nav className={`navbar${className ? ` ${className}` : ''}`} {...other}>{children}</nav>
} 