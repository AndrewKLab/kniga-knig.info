import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const FolderOutlineIcon: FunctionComponent<Icon> = ({ className, size = 32, color = "none" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 32 32`}
            width={size}
            height={size}
            fill={color}
        >
            <path d="M28 11V25.1125C28 25.3479 27.9065 25.5736 27.7401 25.7401C27.5736 25.9065 27.3479 26 27.1125 26H5C4.73478 26 4.48043 25.8946 4.29289 25.7071C4.10536 25.5196 4 25.2652 4 25V8C4 7.73478 4.10536 7.48043 4.29289 7.29289C4.48043 7.10536 4.73478 7 5 7H11.6625C11.8787 7.00089 12.089 7.07098 12.2625 7.2L15.7375 9.8C15.911 9.92902 16.1213 9.99911 16.3375 10H27C27.2652 10 27.5196 10.1054 27.7071 10.2929C27.8946 10.4804 28 10.7348 28 11Z" stroke="#271617" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
} 