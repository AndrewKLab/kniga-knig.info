import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const YouTubeIcon: FunctionComponent<Icon> = ({ className, size = 50, color = "#E5F8E2" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 50 50`}
            width={size}
            height={size}
            fill={'none'}
        >
            <g clipPath="url(#clip0_17_175)">
                <path d="M0 24C0 12.6863 0 7.02944 3.51472 3.51472C7.02944 0 12.6863 0 24 0H26C37.3137 0 42.9705 0 46.4853 3.51472C50 7.02944 50 12.6863 50 24V26C50 37.3137 50 42.9705 46.4853 46.4853C42.9705 50 37.3137 50 26 50H24C12.6863 50 7.02944 50 3.51472 46.4853C0 42.9705 0 37.3137 0 26V24Z" fill={color} />
            </g>
            <path d="M21.8 29.1445V21.8555L28.82 25.5L21.8 29.1445Z" fill={color} />
            <path d="M37.4304 19.6541C37.2767 19.1406 36.9759 18.6725 36.5579 18.2965C36.1399 17.9206 35.6195 17.6499 35.0487 17.5117C32.9467 17 24.5 17 24.5 17C24.5 17 16.0533 17 13.9513 17.5117C13.3805 17.6499 12.8601 17.9206 12.4421 18.2965C12.0241 18.6725 11.7233 19.1406 11.5696 19.6541C11.1771 21.5824 10.9867 23.5396 11.0007 25.5C10.9867 27.4604 11.1771 29.4176 11.5696 31.3459C11.7233 31.8594 12.0241 32.3275 12.4421 32.7035C12.8601 33.0794 13.3805 33.3501 13.9513 33.4883C16.0533 34 24.5 34 24.5 34C24.5 34 32.9467 34 35.0487 33.4883C35.6195 33.3501 36.1399 33.0794 36.5579 32.7035C36.9759 32.3275 37.2767 31.8594 37.4304 31.3459C37.8229 29.4176 38.0133 27.4604 37.9993 25.5C38.0133 23.5396 37.8229 21.5824 37.4304 19.6541ZM21.8001 29.1429V21.8571L28.8101 25.5L21.8001 29.1429Z" fill="#65B658" />
            <defs>
                <clipPath id="clip0_17_175">
                    <rect width="50" height="50" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
} 