import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const BurgerIcon: FunctionComponent<Icon> = ({ className, size = 32, color = "#E5F8E2" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 30 30`}
            width={size}
            height={size}
            fill="none"
        >
            <path d="M4.6875 15H25.3125" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.6875 7.5H25.3125" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.6875 22.5H25.3125" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
} 