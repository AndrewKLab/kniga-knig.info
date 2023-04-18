import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export interface NavbarBrandProps extends React.HTMLProps<HTMLAnchorElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
}

export const NavbarBrand: FunctionComponent<NavbarBrandProps> = ({ children, className, ...other }) => {
  return <Link to={other.href} className={`navbar-brand${className ? ` ${className}` : ''}`}><h1>{children}</h1></Link>
} 