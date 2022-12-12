import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const VKIcon: FunctionComponent<Icon> = ({ className, size = 50, color = "#E5F8E2" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 50 50`}
            width={size}
            height={size}
            fill={'none'}
        >
            <g clipPath="url(#clip0_17_174)">
                <path d="M0 24C0 12.6862 0 7.02944 3.51472 3.51472C7.02944 0 12.6862 0 24 0H26C37.3137 0 42.9705 0 46.4853 3.51472C50 7.02944 50 12.6862 50 24V26C50 37.3137 50 42.9705 46.4853 46.4853C42.9705 50 37.3137 50 26 50H24C12.6862 50 7.02944 50 3.51472 46.4853C0 42.9705 0 37.3137 0 26V24Z" fill={color} />
                <path d="M26.1611 34C17.2779 34 12.2111 27.6186 12 17H16.4497C16.5959 24.7938 19.8762 28.0951 22.4746 28.7758V17H26.6647V23.7217C29.2306 23.4324 31.9261 20.3694 32.8355 17H37.0254C36.3271 21.1522 33.404 24.2152 31.3253 25.4745C33.404 26.4955 36.7333 29.1672 38 34H33.3877C32.3971 30.7668 29.9289 28.2653 26.6647 27.9249V34H26.1611Z" fill="#65B658" />
            </g>
            <defs>
                <clipPath id="clip0_17_174">
                    <rect width="50" height="50" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
} 