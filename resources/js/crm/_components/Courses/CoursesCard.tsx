import React, { FunctionComponent } from "react";
import './index.css'
import {Image} from '../UI';

export interface CoursesCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactChild
    | React.ReactChild[];
    className?: string;

    coursesCardImage?: string;
    coursesCardTitle?: string;
    coursesCardSubtitle?: string;
    coursesCardText?: string;

}

export const CoursesCard: FunctionComponent<CoursesCardProps> = ({ children, className, coursesCardImage, coursesCardTitle, coursesCardSubtitle, coursesCardText, ...other }) => {
    return (
        <div className={`courses-card${className ? ` ${className}` : ''}`} {...other}>
            {coursesCardImage && <Image src={`courses/${coursesCardImage}`} className={`courses-card-image`} />}
            {coursesCardTitle && <div className={`courses-card-title`}>{coursesCardTitle}</div>}
            {coursesCardText && <div className={`courses-card-text`}>{coursesCardText}</div>}
            {coursesCardSubtitle && <div className={`courses-card-subtitle`}>{coursesCardSubtitle}</div>}
            {children}
        </div>
    )
} 