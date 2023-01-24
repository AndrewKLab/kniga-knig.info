import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const MagnifyingGlassOutlineIcon: FunctionComponent<Icon> = ({ className, size = 32, color = "#271617" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 26 26`}
            width={size}
            height={size}
            fill="none"
        >
            <path d="M11.7812 20.3125C16.4929 20.3125 20.3125 16.4929 20.3125 11.7812C20.3125 7.06957 16.4929 3.25 11.7812 3.25C7.06957 3.25 3.25 7.06957 3.25 11.7812C3.25 16.4929 7.06957 20.3125 11.7812 20.3125Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.8141 17.8141L22.75 22.75" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
} 