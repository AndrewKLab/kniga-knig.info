import React, { FunctionComponent, useState } from "react";
import './index.css'
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children?: React.ReactElement;
    className?: string;
}

export const Select: FunctionComponent<SelectProps> = React.forwardRef(({children, className, ...other }, ref) => {
    return (
        <select ref={ref} className={`select-input${className ? ` ${className}` : ''}`} {...other}>
            {children}
        </select>
    )
})

