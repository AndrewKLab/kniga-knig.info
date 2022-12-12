import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const DoneCircleIcon: FunctionComponent<Icon> = ({ className, size = 32, color = "#65B658" }) => {

    return (
        <svg
            className={`icon${className ? ` ${className}` : ``}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 32 32`}
            width={size}
            height={size}
            fill={`none`}
        >
            <circle cx="16" cy="16" r="13" fill="#65B658" />
            <path d="M23 12L14.3333 21L10 16.5" stroke="#FAFFF9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
} 