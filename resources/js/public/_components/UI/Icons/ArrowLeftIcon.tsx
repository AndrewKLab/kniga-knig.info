import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const ArrowLeftIcon: FunctionComponent<Icon> = ({ className, size = 30, color = "#271617" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 30 30`}
            width={size}
            height={size}
            fill="none"
        >
            <path d="M25.3125 15L4.6875 15" stroke="#271617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.125 6.5625L4.6875 15L13.125 23.4375" stroke="#271617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
} 