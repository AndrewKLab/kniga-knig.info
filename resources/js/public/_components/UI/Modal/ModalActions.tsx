import React, { FunctionComponent } from "react";
import { IconButton } from "../IconButton";
import { XCircleIcon } from "../Icons";
import './index.css'

export interface ModalActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
}

export const ModalActions: FunctionComponent<ModalActionsProps> = ({ children, className, ...other }) => {
    return <div className={`modal-actions${className ? ` ${className}` : ''}`} {...other}>{children}</div>
} 