import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import './index.css';
import { Image } from "../../Image";

export interface NavbarBrandProps extends React.HTMLProps<HTMLAnchorElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
}

export const NavbarBrand: FunctionComponent<NavbarBrandProps> = ({ children, className, ...other }) => {
  return <Link to={other.href} className={`navbar-brand${className ? ` ${className}` : ''}`}><Image src={`site/лого КНИГА КНИГ-02 (2).svg`} height={'45px'} width={`100%`} /><h1>{children}</h1></Link>
} 