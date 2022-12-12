import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const UserCircleOutlineIcon: FunctionComponent<Icon> = ({ className, size = 32, color = "#271617" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 38 38`}
            width={size}
            height={size}
            fill="none"
        >
            <path d="M19 33.25C26.8701 33.25 33.25 26.8701 33.25 19C33.25 11.1299 26.8701 4.75 19 4.75C11.1299 4.75 4.75 11.1299 4.75 19C4.75 26.8701 11.1299 33.25 19 33.25Z" stroke="#E5F8E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 23.75C22.2792 23.75 24.9375 21.0917 24.9375 17.8125C24.9375 14.5333 22.2792 11.875 19 11.875C15.7208 11.875 13.0625 14.5333 13.0625 17.8125C13.0625 21.0917 15.7208 23.75 19 23.75Z" stroke="#E5F8E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.47034 29.5985C10.3638 27.8386 11.7271 26.3606 13.4092 25.3281C15.0913 24.2957 17.0264 23.7491 19 23.7491C20.9737 23.7491 22.9088 24.2957 24.5909 25.3281C26.2729 26.3606 27.6363 27.8386 28.5297 29.5985" stroke="#E5F8E2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
} 