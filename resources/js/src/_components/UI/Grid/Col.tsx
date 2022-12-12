import React, { FunctionComponent } from "react";
import "./index.css";

type Colums = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    xs?: Colums;
    sm?: Colums;
    md?: Colums;
    lg?: Colums;
    xl?: Colums;
    xxl?: Colums;
}

export const Col: FunctionComponent<ColProps> = ({ children, className, xs, sm, md, lg, xl, xxl, ...other }) => {
    return <div className={`col${className ? ` ${className}` : ''}${xs ? ` col-${xs}` : ``}${sm ? ` col-sm-${sm}` : ``}${md ? ` col-md-${md}` : ``}${lg ? ` col-lg-${lg}` : ``}${xl ? ` col-xl-${xl}` : ``}${xxl ? ` col-xxl-${xxl}` : ``}`}{...other}>{children}</div>
} 