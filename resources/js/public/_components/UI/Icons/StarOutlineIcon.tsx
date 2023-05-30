import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const StarOutlineIcon: FunctionComponent<Icon> = ({ className, size = 32, color = "rgba(var(--text-color))" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 24 24`}
            width={size}
            height={size}
            fill={'none'}
        >
            <path
                d="M14.65 8.93274L12.4852 4.30901C12.2923 3.89699 11.7077 3.897 11.5148 4.30902L9.35002 8.93274L4.45559 9.68243C4.02435 9.74848 3.84827 10.2758 4.15292 10.5888L7.71225 14.2461L6.87774 19.3749C6.80571 19.8176 7.27445 20.1487 7.66601 19.9317L12 17.5299L16.334 19.9317C16.7256 20.1487 17.1943 19.8176 17.1223 19.3749L16.2878 14.2461L19.8471 10.5888C20.1517 10.2758 19.9756 9.74848 19.5444 9.68243L14.65 8.93274Z"
                stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
} 