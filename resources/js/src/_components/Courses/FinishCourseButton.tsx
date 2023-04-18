import React, { FunctionComponent } from "react";
import './index.css'
import { connect } from 'react-redux';
import { Button } from '../../../public/_components/UI';
import { useNavigate } from "react-router-dom";
import { coursesUsersProgressActions } from "../../_actions/courses_users_progress.actions";
import { CourseUserProgress, Lesson, LessonUserProgress } from "../../../public/_interfaces";

export interface FinishCourseButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    dispatch: any;
    children?: React.ReactElement;

    className?: string;
    lesson: null | Lesson;
    lessons_users_progress?: LessonUserProgress[] | null;

    edit_courses_users_progress_loading: boolean,
    edit_courses_users_progress_message: string | null,
    edit_courses_users_progress_error: string | null,
    edit_courses_users_progress: object | null,
}

const FinishCourseButton: FunctionComponent<FinishCourseButtonProps> = ({
    dispatch,
    children,
    className,
    lesson,
    lessons_users_progress,
    edit_courses_users_progress_loading,
    edit_courses_users_progress_message,
    edit_courses_users_progress_error,
    edit_courses_users_progress,
    ...other
}) => {
    let navigate = useNavigate();
    const finishCourse = async () => {
        if (lessons_users_progress) {
            await dispatch(coursesUsersProgressActions.edit({ kk_cup_id: lessons_users_progress[0].kk_lup_cup_id, kk_lup_status: 'finished' }))
            navigate(`/courses/${lessons_users_progress[0].kk_lup_course_id}`)
        }
    }
    return (lessons_users_progress && lessons_users_progress.length > 0 && lessons_users_progress.filter(lup => lup.kk_lup_status === "finished").length === lesson?.course?.lessons_count ?
        <Button className={`finish-course-button${className ? ` ${className}` : ''}`} loading={edit_courses_users_progress_loading} disabled={edit_courses_users_progress_loading} onClick={finishCourse}>Завершить курс</Button> : null
    )
}
function mapStateToProps(state) {
    const {
        edit_courses_users_progress_loading,
        edit_courses_users_progress_message,
        edit_courses_users_progress_error,
        edit_courses_users_progress,
    } = state.courses_users_progress;
    return {
        edit_courses_users_progress_loading,
        edit_courses_users_progress_message,
        edit_courses_users_progress_error,
        edit_courses_users_progress,
    }
}
const connectedFinishCourseButton = connect(mapStateToProps)(FinishCourseButton);
export { connectedFinishCourseButton as FinishCourseButton };