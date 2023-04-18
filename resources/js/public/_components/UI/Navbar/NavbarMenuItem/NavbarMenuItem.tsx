import React, { FunctionComponent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import './index.css';

export interface NavbarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
  href: string;
  target?: string;
  toOtherSite?: boolean;
}

export const NavbarMenuItem: FunctionComponent<NavbarMenuItemProps> = ({ children, className, href, target, toOtherSite, ...other }) => {
  let location = useLocation();
  return <li className={`navbar-menu-item${className ? ` ${className}` : ''}`} {...other}>
    {toOtherSite ? (
      <a href={href} target="_blank" className={'navbar-menu-item-inactive'}><h2>{children}</h2></a>
    ) : (
      <NavLink to={href} className={({ isActive }) => (location.pathname === href ? 'navbar-menu-item-active ' : 'navbar-menu-item-inactive')}>
        <h2>{children}</h2>
      </NavLink>
    )}
  </li >
} 