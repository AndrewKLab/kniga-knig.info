import React, { FunctionComponent } from "react";

export interface DrawerMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
    isActive?: boolean;
}

export const DrawerMenu: FunctionComponent<DrawerMenuProps> = ({ children, className, isActive, ...other }) => {
    return <div className={`drawer-menu${className ? ` ${className}` : ''} ${isActive ? `active` : `inactive`}`} {...other}>{children}</div>
}

