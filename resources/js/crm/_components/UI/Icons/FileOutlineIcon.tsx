import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const FileOutlineIcon: FunctionComponent<Icon> = ({ className, size = 30, color = "#271617" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 30 30`}
            width={size}
            height={size}
            fill="none"
        >
            <path d="M23.4375 26.25H6.5625C6.31386 26.25 6.0754 26.1512 5.89959 25.9754C5.72377 25.7996 5.625 25.5611 5.625 25.3125V4.6875C5.625 4.43886 5.72377 4.2004 5.89959 4.02459C6.0754 3.84877 6.31386 3.75 6.5625 3.75H17.8125L24.375 10.3125V25.3125C24.375 25.5611 24.2762 25.7996 24.1004 25.9754C23.9246 26.1512 23.6861 26.25 23.4375 26.25Z" stroke="#271617" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.8125 3.75V10.3125H24.375" stroke="#271617" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
} 