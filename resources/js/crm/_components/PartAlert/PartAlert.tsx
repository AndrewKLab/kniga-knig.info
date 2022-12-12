import React, { FunctionComponent } from "react";
import { Alert } from "../UI";
import './index.css'

export interface PartAlertProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactElement;
    className?: string;

    type?: string;
    message?: React.ReactElement;
}

export const PartAlert: FunctionComponent<PartAlertProps> = ({ children, className, type, message, ...other }) => {
    return <div className={`part_loader${className ? ` ${className}` : ''}`} {...other} ><Alert type={type} message={message}/></div>
} 