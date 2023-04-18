import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { lessonsActions, lessonsUsersProgressActions, pagesActions } from "../../../_actions";
import { useParams } from "react-router-dom";
import './index.css';
import { PageLoader, } from "../../../_components";
import { LessonPlane, NoMatchPage } from "../../";
import { User, Lesson, LessonUserProgress, CourseUserProgress } from "../../../../public/_interfaces";
import { localCoursesUserProgressHelper } from "../../../../public/_helpers";
import { Alert } from "../../../../public/_components/UI";
import { PageAlert } from "../../../../public/_components/Alerts";

type LessonPageProps = {
    dispatch: any;
    user: User;

    get_one_by_lesson_id_lessons_loading: boolean;
    get_one_by_lesson_id_lessons_message: string | null,
    get_one_by_lesson_id_lessons_error: string | null,
    get_one_by_lesson_id_lessons: Lesson | null,

    get_one_by_lesson_id_lessons_users_progress_loading: boolean;
    get_one_by_lesson_id_lessons_users_progress_message: string | null,
    get_one_by_lesson_id_lessons_users_progress_error: string | null,
    get_one_by_lesson_id_lessons_users_progress: LessonUserProgress | null,

}

const LessonPage: FunctionComponent<LessonPageProps> = ({
    dispatch,
    user,

    get_one_by_lesson_id_lessons_loading,
    get_one_by_lesson_id_lessons_message,
    get_one_by_lesson_id_lessons_error,
    get_one_by_lesson_id_lessons,

    get_one_by_lesson_id_lessons_users_progress_loading,
    get_one_by_lesson_id_lessons_users_progress_message,
    get_one_by_lesson_id_lessons_users_progress_error,
    get_one_by_lesson_id_lessons_users_progress,

}): JSX.Element => {
    let { kk_course_id, kk_lesson_id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            await dispatch(pagesActions.openPage());
            if (user) {
                await dispatch(lessonsActions.getOneByLessonId({
                    kk_lesson_id: kk_lesson_id,
                    kk_course_id: kk_course_id,
                    parts: 'course,lessons,course_users_progress,questions,answers,user_answer',
                    course_published: 1,
                    lesson_published: 1,
                    lessons_published: 1,
                    parts_to_count: 'lessons'
                }))
                await dispatch(lessonsUsersProgressActions.getOneByLessonId({ kk_lup_course_id: kk_course_id, kk_lup_lesson_id: kk_lesson_id }))
            } else {
                localCoursesUserProgressHelper.createCUP(kk_course_id);

                await dispatch(lessonsActions.getOneByLessonId({
                    kk_lesson_id: kk_lesson_id,
                    kk_course_id: kk_course_id,
                    parts: 'course,lessons,questions,answers',
                    course_published: 1,
                    lesson_published: 1,
                    lessons_published: 1,
                    parts_to_count: 'lessons'
                }))
            }

            setLoading(false)
        }
        init();
    }, [kk_course_id, kk_lesson_id]);


    if (loading || get_one_by_lesson_id_lessons_loading || get_one_by_lesson_id_lessons_users_progress_loading) return <PageLoader />
    else if (get_one_by_lesson_id_lessons_error) return <PageAlert message={get_one_by_lesson_id_lessons_error} type={'danger'} className={`lesson_page_actions_error_alert`} />
    else if (get_one_by_lesson_id_lessons && !loading) return <div className={`lesson_page`}><LessonPlane /></div>
    else return <NoMatchPage />

}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        get_one_by_lesson_id_lessons_loading,
        get_one_by_lesson_id_lessons_message,
        get_one_by_lesson_id_lessons_error,
        get_one_by_lesson_id_lessons,
    } = state.lessons;
    const {

        get_one_by_lesson_id_lessons_users_progress_loading,
        get_one_by_lesson_id_lessons_users_progress_message,
        get_one_by_lesson_id_lessons_users_progress_error,
        get_one_by_lesson_id_lessons_users_progress,
    } = state.lessons_users_progress;
    return {
        user,

        get_one_by_lesson_id_lessons_loading,
        get_one_by_lesson_id_lessons_message,
        get_one_by_lesson_id_lessons_error,
        get_one_by_lesson_id_lessons,

        get_one_by_lesson_id_lessons_users_progress_loading,
        get_one_by_lesson_id_lessons_users_progress_message,
        get_one_by_lesson_id_lessons_users_progress_error,
        get_one_by_lesson_id_lessons_users_progress,

    };
}
const connectedLessonPage = connect(mapStateToProps)(LessonPage);
export { connectedLessonPage as LessonPage };