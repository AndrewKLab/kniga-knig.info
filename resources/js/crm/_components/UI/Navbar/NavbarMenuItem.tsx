import React, { FunctionComponent } from "react";
import { NavLink, useLocation } from "react-router-dom";

export interface NavbarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
  href: string;
  target: string;
}

export const NavbarMenuItem: FunctionComponent<NavbarMenuItemProps> = ({ children, className, href, target, ...other }) => {
  let location = useLocation();
  return <li className={`navbar-menu-item${className ? ` ${className}` : ''}`} {...other}>
    <NavLink to={href} target={target} className={({ isActive }) => (location.pathname === href ? 'navbar-menu-item-active ' : 'navbar-menu-item-inactive')}>
      {children}
    </NavLink>
  </li>
} 