import React, { FunctionComponent } from "react";
import { IconButton } from "../IconButton";
import { XCircleIcon } from "../Icons";
import './index.css'

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
}

export const ModalBody: FunctionComponent<ModalBodyProps> = ({ children, className, ...other }) => {
    return <div className={`modal-body${className ? ` ${className}` : ''}`} {...other}>{children}</div>
} 