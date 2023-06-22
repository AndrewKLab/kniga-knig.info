import React, { FunctionComponent, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { Image, Button, InputError, IconButton, TextInput, Label, Form, Loading, Alert, Tabs, Row, Col, ProgressBar } from '../../../public/_components/UI';
import { PenOutlineIcon, LockKeyOutlineIcon } from "../../../public/_components/UI/Icons";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { User } from '../../_interfaces';
import { authActions, coursesUsersProgressActions, pagesActions } from "../../_actions";
import { useNavigate } from "react-router-dom";
import './index.css';
import { config, getLastInprocessLesson } from "../../_helpers";
import { CoursesCard, PartLoader } from "../../_components";


type MyTrainingPageCoursesListProps = {
    courses: Array<any> | null;
}

const MyTrainingPageCoursesList: FunctionComponent<MyTrainingPageCoursesListProps> = ({ courses }): JSX.Element => {
    return courses && courses.length > 0 ? (
        <Row g={3}>
            {courses.map((item, index) => <MyTrainingPageCourseItem key={item.kk_cup_id} item={item} />)}
        </Row>
    ) : (<Alert className={`p-0`} message={`Ничего не найдено.`} />)
}

type MyTrainingPageCourseItemProps = {
    item: object | null;
}

const MyTrainingPageCourseItem: FunctionComponent<MyTrainingPageCourseItemProps> = ({ item }): JSX.Element => {
    let navigate = useNavigate();
    return item && item.course ?
        <Col key={item.kk_cup_id} xs={12} lg={6} className={`profile-page-course-item`}>
            <CoursesCard
                dontShare
                coursesCardImage={item.course.kk_course_image}
                coursesCardTitle={item.course.kk_course_name}
                coursesCardText={item.course.kk_course_description}
                coursesCardSubtitle={
                    <React.Fragment>
                        <div>{`${item.course.lessons_count} уроков`}</div>
                        <div className={`courses-card-progress`}>
                            Пройдено
                            <ProgressBar progress={(item.course.lessons_users_progress_count / item.course.lessons_count)} />
                            <div>{item.course.lessons_users_progress_count} из {item.course.lessons_count}</div>
                        </div>
                        <Button className={`courses-card-button`} onClick={() =>
                            navigate(`/courses/${item.course.kk_course_id}/${item?.lessons_users_progress ?
                                getLastInprocessLesson(item?.course?.lessons, item?.lessons_users_progress)
                                :
                                item?.course.lessons[0].kk_lesson_id}`)}
                        >
                            Продолжить изучение
                        </Button>
                    </React.Fragment>
                }
            />
        </Col> : <React.Fragment></React.Fragment>
}

type MyTrainingPageProps = {
    dispatch: any;
    user: User;

    edit_avatar_auth_user_loading: boolean,
    edit_avatar_auth_user_message: string | null,
    edit_avatar_auth_user_errors: object | null,
    edit_avatar_auth_user_error_message: string | null,

    auth_user_inprocess_courses: Array<any> | null,
    auth_user_finished_courses: Array<any> | null,

    get_all_courses_users_progress_loading: boolean,
    get_all_courses_users_progress_message: string | null,
    get_all_courses_users_progress_error: string | null,
    get_all_courses_users_progress: object | null,
}

const MyTrainingPage: FunctionComponent<MyTrainingPageProps> = ({
    dispatch,
    user,
    edit_avatar_auth_user_loading,
    edit_avatar_auth_user_message,
    edit_avatar_auth_user_errors,
    edit_avatar_auth_user_error_message,

    auth_user_inprocess_courses,
    auth_user_finished_courses,

    get_all_courses_users_progress_loading,
    get_all_courses_users_progress_message,
    get_all_courses_users_progress_error,
    get_all_courses_users_progress,
}): JSX.Element => {
    let navigate = useNavigate();
    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        const init = async () => {
            await dispatch(pagesActions.openPage())
            await dispatch(coursesUsersProgressActions.getAll({
                parts: 'course,lessons,lessons_users_progress',
                parts_to_count: 'lessons,lessons_users_progress',
                course_published: 1,
                lesson_published: 1,
                lessons_users_progress_status: 'finished'
            }))
        }
        init();
    }, []);


    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('forgotPassword');
        return token;
    }, [executeRecaptcha]);

    const onSubmitForgotPasswordForm = async (data) => {
        const token = await handleReCaptchaVerify();
        await dispatch(authActions.forgotPassword({ ...data, "g-recaptcha-response": token }, navigate))
    };

    const handleReCaptchaVerifyForAvatar = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('editAvatarAuthUser');
        return token;
    }, [executeRecaptcha]);
    const onChangeUserAvatarSubmit = async (event) => {
        const token = await handleReCaptchaVerifyForAvatar();
        await dispatch(authActions.editAvatarAuthUser({ "kk_user_avatar": event.target.files[0], "g-recaptcha-response": token }))
    };

    return (
        <div className={`profile_page`}>
            <h1 className={`profile_page_title`}>Моё обучение</h1>
            {get_all_courses_users_progress_loading && <PartLoader />}
            {get_all_courses_users_progress_error && <Alert className={`p-0`} message={get_all_courses_users_progress_error} />}
            {(auth_user_inprocess_courses && auth_user_inprocess_courses.length > 0) || (auth_user_finished_courses && auth_user_finished_courses.length > 0) ?
                <Tabs tabs={[
                    {
                        key: 0,
                        menuTitle: 'в процессе',
                        contentComponent: <MyTrainingPageCoursesList courses={auth_user_inprocess_courses} />
                    },
                    {
                        key: 1,
                        menuTitle: 'завершенные',
                        contentComponent: <MyTrainingPageCoursesList courses={auth_user_finished_courses} />
                    },
                ]} />
                : null}
        </div>
    )
}

function mapStateToProps(state) {
    const {
        user,

        edit_avatar_auth_user_loading,
        edit_avatar_auth_user_message,
        edit_avatar_auth_user_errors,
        edit_avatar_auth_user_error_message
    } = state.auth;
    const {
        auth_user_inprocess_courses,
        auth_user_finished_courses,

        get_all_courses_users_progress_loading,
        get_all_courses_users_progress_message,
        get_all_courses_users_progress_error,
        get_all_courses_users_progress,
    } = state.courses_users_progress;

    return {
        user,
        edit_avatar_auth_user_loading,
        edit_avatar_auth_user_message,
        edit_avatar_auth_user_errors,
        edit_avatar_auth_user_error_message,

        auth_user_inprocess_courses,
        auth_user_finished_courses,

        get_all_courses_users_progress_loading,
        get_all_courses_users_progress_message,
        get_all_courses_users_progress_error,
        get_all_courses_users_progress,
    };
}
const connectedMyTrainingPage = connect(mapStateToProps)(MyTrainingPage);
export { connectedMyTrainingPage as MyTrainingPage };