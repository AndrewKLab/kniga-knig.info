import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const ChartLineUpOutlineIcon: FunctionComponent<Icon> = ({ className, size = 22, color = "#271617" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 22 22`}
            width={size}
            height={size}
            fill="none"
        >
            <path d="M19.25 17.875H2.75V4.125" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.875 5.5L11 12.375L8.25 9.625L2.75 15.125" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.875 8.9375V5.5H14.4375" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
} 