import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const MinusUserIcon: FunctionComponent<Icon> = ({ className, size = 32, color = "rgba(var(--text-color))" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 32 32`}
            width={size}
            height={size}
            fill={color}
        >
            <path d="M2.016 28q0 0.832 0.576 1.44t1.408 0.576h16q-2.496 0-4.256-1.76t-1.728-4.256q0-2.208 1.44-3.872t3.584-2.016q1.376-1.152 2.176-2.72t0.8-3.392v-1.984q0-3.328-2.368-5.664t-5.632-2.336-5.664 2.336-2.336 5.664v1.984q0 2.112 1.024 3.904t2.784 2.912q-1.504 0.544-2.912 1.504t-2.496 2.144-1.76 2.624-0.64 2.912zM18.016 24q0 0.832 0.576 1.44t1.408 0.576h8q0.832 0 1.408-0.576t0.608-1.44-0.608-1.408-1.408-0.576h-8q-0.832 0-1.408 0.576t-0.576 1.408z"></path>
        </svg>
    )
} 