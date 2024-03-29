import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const TimerOutlineIcon: FunctionComponent<Icon> = ({ className, size = 32, color = "none" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 32 32`}
            width={size}
            height={size}
            fill={color}
        >
            <path d="M16 27C22.0751 27 27 22.0751 27 16C27 9.92487 22.0751 5 16 5C9.92487 5 5 9.92487 5 16C5 22.0751 9.92487 27 16 27Z" stroke="#271617" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 16L20.95 11.05" stroke="#271617" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 1H19" stroke="#271617" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
} 