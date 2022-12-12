import React, { FunctionComponent } from "react";
import { Alert } from "../UI";
import './index.css'

export interface PageAlertProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactElement;
    className?: string;

    type?: string;
    message?: React.ReactElement;
}

export const PageAlert: FunctionComponent<PageAlertProps> = ({ children, className, type, message, ...other }) => {
    const header = document.getElementById('header')
    // const footer = document.getElementById('footer')
    return <div className={`page_loader${className ? ` ${className}` : ''}`} {...other} style={{ height: `calc(100vh - ${header?.offsetHeight}px - 90px)` }}><Alert type={type} message={message}/></div>
} 