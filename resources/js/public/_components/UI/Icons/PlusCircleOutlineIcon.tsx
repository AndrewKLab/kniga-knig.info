import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const PlusCircleOutlineIcon: FunctionComponent<Icon> = ({ className, size = 32, color = "none", stroke ="#271617" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 32 32`}
            width={size}
            height={size}
            fill={color}
        >

            <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 16H21" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 11V21" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
} 