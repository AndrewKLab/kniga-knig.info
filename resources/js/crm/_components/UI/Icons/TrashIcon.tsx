import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const TrashIcon: FunctionComponent<Icon> = ({ className, size = 2, color = "#271617" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 22 22`}
            width={size}
            height={size}
            fill="none"
        >
            <path d="M18.5625 4.125H15.125V3.4375C15.1227 2.89119 14.9047 2.3679 14.5184 1.98159C14.1321 1.59529 13.6088 1.37726 13.0625 1.375H8.9375C8.39119 1.37726 7.8679 1.59529 7.48159 1.98159C7.09529 2.3679 6.87726 2.89119 6.875 3.4375V4.125H3.4375C3.25516 4.125 3.0803 4.19743 2.95136 4.32636C2.82243 4.4553 2.75 4.63016 2.75 4.8125C2.75 4.99484 2.82243 5.1697 2.95136 5.29864C3.0803 5.42757 3.25516 5.5 3.4375 5.5H4.125V17.875C4.125 18.2397 4.26987 18.5894 4.52773 18.8473C4.78559 19.1051 5.13533 19.25 5.5 19.25H16.5C16.8647 19.25 17.2144 19.1051 17.4723 18.8473C17.7301 18.5894 17.875 18.2397 17.875 17.875V5.5H18.5625C18.7448 5.5 18.9197 5.42757 19.0486 5.29864C19.1776 5.1697 19.25 4.99484 19.25 4.8125C19.25 4.63016 19.1776 4.4553 19.0486 4.32636C18.9197 4.19743 18.7448 4.125 18.5625 4.125ZM9.625 14.4375C9.625 14.6198 9.55257 14.7947 9.42364 14.9236C9.2947 15.0526 9.11984 15.125 8.9375 15.125C8.75516 15.125 8.5803 15.0526 8.45136 14.9236C8.32243 14.7947 8.25 14.6198 8.25 14.4375V8.9375C8.25 8.75516 8.32243 8.5803 8.45136 8.45136C8.5803 8.32243 8.75516 8.25 8.9375 8.25C9.11984 8.25 9.2947 8.32243 9.42364 8.45136C9.55257 8.5803 9.625 8.75516 9.625 8.9375V14.4375ZM13.75 14.4375C13.75 14.6198 13.6776 14.7947 13.5486 14.9236C13.4197 15.0526 13.2448 15.125 13.0625 15.125C12.8802 15.125 12.7053 15.0526 12.5764 14.9236C12.4474 14.7947 12.375 14.6198 12.375 14.4375V8.9375C12.375 8.75516 12.4474 8.5803 12.5764 8.45136C12.7053 8.32243 12.8802 8.25 13.0625 8.25C13.2448 8.25 13.4197 8.32243 13.5486 8.45136C13.6776 8.5803 13.75 8.75516 13.75 8.9375V14.4375ZM13.75 4.125H8.25V3.4375C8.25 3.25516 8.32243 3.0803 8.45136 2.95136C8.5803 2.82243 8.75516 2.75 8.9375 2.75H13.0625C13.2448 2.75 13.4197 2.82243 13.5486 2.95136C13.6776 3.0803 13.75 3.25516 13.75 3.4375V4.125Z" fill={color}/>

        </svg>
    )
} 