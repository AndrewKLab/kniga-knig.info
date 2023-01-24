import React, { FunctionComponent } from "react";

export interface ListItemRightComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
}

export const ListItemRightComponent: FunctionComponent<ListItemRightComponentProps> = ({ children, className, ...other}): JSX.Element => {
    return <div className={`list-item-right-component${className ? ` ${className}` : ''}`} {...other}>{children}</div>
}   