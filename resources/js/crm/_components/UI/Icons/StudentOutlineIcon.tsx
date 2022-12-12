import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const StudentOutlineIcon: FunctionComponent<Icon> = ({ className, size = 22, color = "#271617" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 22 22`}
            width={size}
            height={size}
            fill="none"
        >
            <path d="M2.75 5.5V12.375" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.6582 18.5624C5.3461 17.5074 6.28636 16.6406 7.39379 16.0406C8.50123 15.4406 9.74086 15.1263 11.0004 15.1263C12.2599 15.1263 13.4996 15.4406 14.607 16.0406C15.7144 16.6406 16.6547 17.5074 17.3426 18.5624" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19.25 5.5L11 8.25L2.75 5.5L11 2.75L19.25 5.5Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.5492 7.06409C15.1799 7.75277 15.5965 8.61006 15.7484 9.53144C15.9003 10.4528 15.7809 11.3985 15.4046 12.2531C15.0284 13.1078 14.4116 13.8346 13.6295 14.3448C12.8475 14.855 11.9338 15.1267 11 15.1267C10.0662 15.1267 9.15255 14.855 8.37046 14.3448C7.58837 13.8346 6.97162 13.1078 6.59539 12.2531C6.21916 11.3985 6.0997 10.4528 6.25159 9.53144C6.40347 8.61006 6.82014 7.75277 7.45078 7.06409" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
} 