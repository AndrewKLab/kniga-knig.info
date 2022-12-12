import React, { FunctionComponent } from "react";
import { Loading } from "../Loading";
import './index.css';

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: React.ReactElement | React.ReactNode;
    className?: string;
    loading?: boolean;
}

export const Button: FunctionComponent<ButtonProps> = ({ children, className, loading, ...other }) => {
    return (
        <button type={other?.type ? other.type : `button`} className={`button${className ? ` ${className}` : ''}`} {...other}>
            {loading && <div className="button-loading"><Loading color={"rgba(255, 255, 255, 1)"} borderColor={'rgba(var(--background-color), 0.5)'}/></div>}
            {children}
        </button>
    );
} 