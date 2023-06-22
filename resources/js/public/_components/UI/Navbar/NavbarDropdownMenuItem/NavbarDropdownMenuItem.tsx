import React, { FunctionComponent, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import './index.css';
import { useDetectOutsideClick } from "../../../../_hooks";

export interface NavbarDropdownMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
    items: object[];
    target?: string;

}

export const NavbarDropdownMenuItem: FunctionComponent<NavbarDropdownMenuItemProps> = ({ children, className, items, target, ...other }) => {
    let location = useLocation();
    const showMenuRef = useRef(null);
    const [showMenu, setShowMenu] = useDetectOutsideClick(showMenuRef, false);

    return <li className={`navbar-menu-item navbar-menu-dropdown${className ? ` ${className}` : ''}`} {...other}>
        <div className={({ isActive }) => (location.pathname === href ? 'navbar-menu-item-active ' : 'navbar-menu-item-inactive')} onClick={() => setShowMenu(!showMenu)}>
            <h2>{children}</h2>
        </div>
        <div ref={showMenuRef} className={`navbar-menu-dropdown-menu${showMenu && items.length > 0 ? ` show` : ``}`}>
            {items.map((item, index) => <NavLink key={item.key} to={item.key} className={`navbar-menu-dropdown-menu-item`} onClick={() => setShowMenu(!showMenu)}>{item.title}</NavLink>)}
        </div>
    </li >
} 