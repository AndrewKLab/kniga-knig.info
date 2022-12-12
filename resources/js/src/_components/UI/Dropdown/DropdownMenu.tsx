import React, { FunctionComponent } from "react";

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
    isActive?: boolean;
}

export const DropdownMenu: FunctionComponent<DropdownMenuProps> = ({ children, className, isActive, ...other }) => {
    return <div className={`dropdown-menu${className ? ` ${className}` : ''} ${isActive ? `active` : `inactive`}`} {...other}>{children}</div>
}

