import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const ListElipce: FunctionComponent<Icon> = ({ className, size = 32, color = "#E5F8E2" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 12 12`}
            width={size}
            height={size}
            fill="none"
        >
            <circle cx="6" cy="6" r="6" fill="#271617"/>
        </svg>
    )
} 