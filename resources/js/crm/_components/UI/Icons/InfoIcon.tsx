import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const InfoIcon: FunctionComponent<Icon> = ({ className, size = 22, color = "rgba(var(--text-color), 1)" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 22 22`}
            width={size}
            height={size}
            fill={color}
        >
            <path d="M11 19.25C15.5563 19.25 19.25 15.5563 19.25 11C19.25 6.44365 15.5563 2.75 11 2.75C6.44365 2.75 2.75 6.44365 2.75 11C2.75 15.5563 6.44365 19.25 11 19.25Z" stroke={'none'} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.3125 10.3125H11V15.125H11.6875" stroke={'rgba(var(--background-color-light), 1)'} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.8281 7.90625C11.2078 7.90625 11.5156 7.59845 11.5156 7.21875C11.5156 6.83905 11.2078 6.53125 10.8281 6.53125C10.4484 6.53125 10.1406 6.83905 10.1406 7.21875C10.1406 7.59845 10.4484 7.90625 10.8281 7.90625Z" fill={'rgba(var(--background-color-light), 1)'} />
        </svg>
    )
} 