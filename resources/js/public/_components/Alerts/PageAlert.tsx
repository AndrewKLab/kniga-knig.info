import React, { FunctionComponent } from "react";
import { Alert, Loading } from "../UI";
import './index.css'

export interface PageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactElement | React.ReactNode;
    className?: string;
    message?: React.ReactElement | React.ReactNode;
    type?: string;
}

export const PageAlert: FunctionComponent<PageLoaderProps> = ({ children, className, message, type, ...other }) => {
    const header = document.getElementById('header')
    const footer = document.getElementById('footer')
    return <div className={`page_alert${className ? ` ${className}` : ''}`} {...other} style={{ height: `calc(100vh - ${header?.offsetHeight}px - ${footer?.offsetHeight}px)` }}><Alert message={message} type={type} /></div>
} 