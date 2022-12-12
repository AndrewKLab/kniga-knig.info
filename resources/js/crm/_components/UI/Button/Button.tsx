import React, { FunctionComponent } from "react";
import { Loading } from "../Loading";
import './index.css';

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;
    loading?: boolean;
    color?: string;
}

export const Button: FunctionComponent<ButtonProps> = ({ children, className, loading, color, ...other }) => {
    return (
        <button type="button" className={`button${color ? ` button-${color}`:``}${className ? ` ${className}` : ''}`} {...other}>
            {loading && <div className="button-loading"><Loading color={"rgba(255, 255, 255, 1)"} borderColor={'rgba(var(--background-color), 0.5)'}/></div>}
            {children}
        </button>
    );
} 