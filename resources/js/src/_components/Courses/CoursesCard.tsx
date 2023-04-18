import React, { FunctionComponent, useState } from "react";
import './index.css';
import { connect } from 'react-redux';
import { User } from "../../_interfaces";
import { config } from "../../_helpers";
import { IconButton, Image, Share } from "../../../public/_components/UI";
import { ShareOutlineIcon } from "../../../public/_components/UI/Icons";
import { Course } from "../../../public/_interfaces";

export interface CoursesCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactElement | React.ReactNode;
    className?: string;

    user?: User;
    course: Course;
    coursesCardImage?: string;
    coursesCardTitle?: string;
    coursesCardSubtitle?: string;
    coursesCardText?: string;

    dontShare?: boolean;

}

const CoursesCard: FunctionComponent<CoursesCardProps> = ({ children, className, coursesCardImage, coursesCardTitle, coursesCardSubtitle, coursesCardText, user, course, dontShare, ...other }) => {
    const [showShare, setShowShare] = useState(false);
    return (
        <div className={`courses-card${className ? ` ${className}` : ''}`} {...other}>
            {coursesCardImage && <Image src={`courses/${coursesCardImage}`} className={`courses-card-image`} />}
            {coursesCardTitle && <div className={`courses-card-title`}>{coursesCardTitle}</div>}
            {coursesCardText && <div className={`courses-card-text`} dangerouslySetInnerHTML={{ __html: coursesCardText }}></div>}
            {coursesCardSubtitle && <div className={`courses-card-subtitle`}>{coursesCardSubtitle}</div>}
            {user && !dontShare && <div className={`courses-card-share-buttons`} onClick={(event) => event.stopPropagation()}>
                <Share link={`${config.appUrl}/registration${user?.role?.kk_role_level < 7 ? `?referal_user=${user?.kk_user_id}&course=${course.kk_course_id}` : ``}`} className={`${showShare ? `active` : ``}`} whatsapp viber telegram sms copy />
                <IconButton icon={<ShareOutlineIcon size={32} />} onClick={(event) => { event.stopPropagation(), setShowShare(!showShare) }} />
            </div>}
            {children}
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return { user };
}

const connectedCoursesCard = connect(mapStateToProps)(CoursesCard);
export { connectedCoursesCard as CoursesCard };