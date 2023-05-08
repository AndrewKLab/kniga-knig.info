import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const OrganizationIcon: FunctionComponent<Icon> = ({ className, size = 32, color = "rgba(var(--text-color))" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 32 32`}
            width={size}
            height={size}
            fill={color}
        >
            <path d="M25.469 18h4.531c1.094 0 2 0.906 2 2v10c0 1.094-0.906 2-2 2h-10c-1.094 0-2-0.906-2-2v-10c0-1.094 0.906-2 2-2h3.531v-1.188h-15.094v1.188h3.563c1.094 0 2 0.906 2 2v10c0 1.094-0.906 2-2 2h-10c-1.094 0-2-0.906-2-2v-10c0-1.094 0.906-2 2-2h4.5v-1.875c0-0.688 0.875-1.031 1.656-1.031h6.875v-1.125h-4.313c-1.094 0-2-0.906-2-2v-10c0-1.094 0.906-2 2-2h10c1.094 0 2 0.906 2 2v10c0 1.094-0.906 2-2 2h-3.688v1.156c2.594 0 4.188-0.031 6.781-0.031 0.781 0 1.656 0.313 1.656 1.031v1.875zM30 20h-10v10h10v-10zM20.719 1.969h-10v10h10v-10zM12 20h-10v10h10v-10z"></path>
        </svg>
    )
} 