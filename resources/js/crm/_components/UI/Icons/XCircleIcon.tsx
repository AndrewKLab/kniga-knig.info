import React, { FunctionComponent } from "react";
import { Icon } from '../../../_interfaces';

export const XCircleIcon: FunctionComponent<Icon> = ({ className, size = 32, color = "#65B658" }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 26 26`}
            width={size}
            height={size}
            fill={color}
        >
            <path d="M13 2.4375C10.9109 2.4375 8.86879 3.05698 7.13179 4.2176C5.3948 5.37822 4.04098 7.02786 3.24153 8.95791C2.44208 10.8879 2.2329 13.0117 2.64046 15.0606C3.04802 17.1096 4.054 18.9916 5.53119 20.4688C7.00838 21.946 8.89044 22.952 10.9394 23.3595C12.9883 23.7671 15.1121 23.5579 17.0421 22.7585C18.9721 21.959 20.6218 20.6052 21.7824 18.8682C22.943 17.1312 23.5625 15.0891 23.5625 13C23.5571 10.2003 22.4426 7.5168 20.4629 5.53711C18.4832 3.55742 15.7997 2.44287 13 2.4375ZM16.8289 15.6711C16.9815 15.8251 17.0671 16.0332 17.0671 16.25C17.0671 16.4668 16.9815 16.6749 16.8289 16.8289C16.6736 16.9791 16.466 17.063 16.25 17.063C16.034 17.063 15.8264 16.9791 15.6711 16.8289L13 14.1477L10.3289 16.8289C10.1736 16.9791 9.96603 17.063 9.75 17.063C9.53398 17.063 9.3264 16.9791 9.1711 16.8289C9.01853 16.6749 8.93293 16.4668 8.93293 16.25C8.93293 16.0332 9.01853 15.8251 9.1711 15.6711L11.8523 13L9.1711 10.3289C9.04153 10.171 8.97532 9.97063 8.98534 9.76665C8.99536 9.56267 9.08089 9.36971 9.2253 9.2253C9.36971 9.08089 9.56267 8.99535 9.76665 8.98534C9.97063 8.97532 10.171 9.04153 10.3289 9.17109L13 11.8523L15.6711 9.17109C15.829 9.04153 16.0294 8.97532 16.2334 8.98534C16.4373 8.99535 16.6303 9.08089 16.7747 9.2253C16.9191 9.36971 17.0047 9.56267 17.0147 9.76665C17.0247 9.97063 16.9585 10.171 16.8289 10.3289L14.1477 13L16.8289 15.6711Z" />
        </svg>
    )
} 