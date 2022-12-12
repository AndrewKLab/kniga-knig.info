import React, { FunctionComponent } from "react";
import './index.css';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    size?: number;
    borderWidth?: number;
    color?: string;
    borderColor?: string;
}

export const Loading: FunctionComponent<LoadingProps> = ({
    children,
    className,
    size = 40,
    color = "rgba(var(--primary-color), 1)",
    borderColor = "rgba(var(--icon-color-light), 1)",
    borderWidth,
    ...other
}) => {
    let calcBorderWidth = size / 8;
    return (
        <div
            className={`loading${className ? ` ${className}` : ''}`}
            style={{
                width: size,
                height: size,
                borderWidth: borderWidth ? borderWidth : calcBorderWidth,
                borderLeftColor: borderColor,
                borderBottomColor: borderColor,
                borderRightColor: borderColor,
                borderTopColor: color,
                
            }} {...other}>
        </div>
    );
} 