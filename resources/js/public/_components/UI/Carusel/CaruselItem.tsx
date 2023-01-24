import React, { FunctionComponent } from "react";
import { Image } from '../Image';
import "./index.css";

export interface CaruselItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    caruselCols:number;
}

export const CaruselItem: FunctionComponent<CaruselItemProps> = ({ children, className, caruselCols, ...other }) => {
    return (
        <div className={`carusel-item${caruselCols ? ` col-${12/caruselCols}`:``}`} {...other}>{children}</div>
    )
} 