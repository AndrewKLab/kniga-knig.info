import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const ChatIcon: FunctionComponent<Icon> = ({ className, size = 32, color = "rgba(var(--text-color))" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 24 24`}
            width={size}
            height={size}
            fill={color}
        >
            <path d="M21,12a8.937,8.937,0,0,1-1.4,4.8L21,21l-4.2-1.4A8.994,8.994,0,1,1,21,12Z"/>
        </svg>
    )
} 