import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const PenOutlineIcon: FunctionComponent<Icon> = ({ className, size = 32, color = "rgba(var(--text-color))" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 32 32`}
            width={size}
            height={size}
            fill="none"
        >
            <path d="M11.5875 27H6.00001C5.73479 27 5.48044 26.8947 5.2929 26.7071C5.10536 26.5196 5.00001 26.2652 5.00001 26V20.4125C4.99955 20.2827 5.02471 20.154 5.07404 20.0339C5.12338 19.9138 5.19591 19.8046 5.28751 19.7125L20.2875 4.71251C20.3806 4.61803 20.4915 4.54299 20.6138 4.49178C20.7361 4.44056 20.8674 4.41418 21 4.41418C21.1326 4.41418 21.2639 4.44056 21.3862 4.49178C21.5085 4.54299 21.6195 4.61803 21.7125 4.71251L27.2875 10.2875C27.382 10.3806 27.457 10.4915 27.5082 10.6138C27.5595 10.7361 27.5858 10.8674 27.5858 11C27.5858 11.1326 27.5595 11.2639 27.5082 11.3862C27.457 11.5086 27.382 11.6195 27.2875 11.7125L12.2875 26.7125C12.1955 26.8041 12.0863 26.8766 11.9661 26.926C11.846 26.9753 11.7174 27.0005 11.5875 27V27Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 8L24 15"  stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 24L25 19L24 15"  stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.0625 20.0625L11.9375 26.9375"  stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
} 