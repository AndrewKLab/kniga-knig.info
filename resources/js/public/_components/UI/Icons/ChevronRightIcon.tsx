import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const ChevronRightIcon: FunctionComponent<Icon> = ({ className, size = 16, color = "rgba(var(--text-color))" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 17 16`}
            width={size}
            height={size}
            fill="none"
            className={className ? className : ''}
        >
            <g clipPath="url(#clip0_408_1220)">
                <path d="M6.69434 12L10.6943 8L6.69434 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_408_1220">
                    <rect width="16" height="16" fill="white" transform="translate(0.194336)" />
                </clipPath>
            </defs>
        </svg>
    )
} 