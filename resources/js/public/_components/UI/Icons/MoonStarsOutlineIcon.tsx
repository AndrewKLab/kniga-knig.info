import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const MoonStarsOutlineIcon: FunctionComponent<Icon> = ({ className, size = 32, color = "#271617" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 38 38`}
            width={size}
            height={size}
            fill="none"
        >

            <path d="M32.0625 16.625V9.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M35.625 13.0625H28.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24.9375 3.5625V8.3125" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M27.3125 5.9375H22.5625" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M32.1664 22.6516C29.8349 23.3054 27.3715 23.3268 25.029 22.7137C22.6865 22.1005 20.5494 20.8749 18.8373 19.1628C17.1251 17.4506 15.8995 15.3135 15.2864 12.971C14.6732 10.6285 14.6947 8.16508 15.3484 5.83362C13.0498 6.4734 10.959 7.70426 9.28408 9.40359C7.60921 11.1029 6.4088 13.2114 5.8024 15.5191C5.19601 17.8267 5.2048 20.2529 5.82791 22.5561C6.45101 24.8593 7.66668 26.959 9.35383 28.6462C11.041 30.3333 13.1407 31.549 15.4439 32.1721C17.7471 32.7952 20.1733 32.804 22.481 32.1976C24.7886 31.5912 26.8971 30.3908 28.5964 28.7159C30.2958 27.0411 31.5266 24.9502 32.1664 22.6516V22.6516Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
} 