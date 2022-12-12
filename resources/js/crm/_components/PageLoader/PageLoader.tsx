import React, { FunctionComponent } from "react";
import { Loading } from "../UI";
import './index.css'

export interface PageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
}

export const PageLoader: FunctionComponent<PageLoaderProps> = ({ children, className, ...other }) => {
    const header = document.getElementById('header')
    // const footer = document.getElementById('footer')
    return <div className={`page_loader${className ? ` ${className}` : ''}`} {...other} style={{ height: `calc(100vh - ${header?.offsetHeight}px - 90px)` }}><Loading /></div>
} 