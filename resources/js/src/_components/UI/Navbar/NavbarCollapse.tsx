import React, {FunctionComponent} from "react";

export interface NavbarCollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  children?:
  | React.ReactChild
  | React.ReactChild[];
  className?: string;
}

export const NavbarCollapse: FunctionComponent<NavbarCollapseProps> = ({ children, className, ...other}) => {
    return <div className={`navbar-collapse${className ? ` ${className}` : ''}`} {...other}>{children}</div>
} 