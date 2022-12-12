import React, { FunctionComponent, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { Image, Button, InputError, IconButton, TextInput, Label, Form, Loading, Alert, Tabs, Row, Col, ProgressBar } from '../../../_components/UI';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { User } from '../../../_interfaces';
import { authActions, coursesUsersProgressActions } from "../../../_actions";
import { Navigate, useNavigate } from "react-router-dom";
import './index.css';
import { config } from "../../../_helpers";
import { PenOutlineIcon, LockKeyOutlineIcon } from "../../../_components/UI/Icons";
import { CoursesCard, PartLoader } from "../../../_components";

type ProfilePageCoursesListProps = {
    courses: Array<any> | null;
}

const ProfilePageCoursesList: FunctionComponent<ProfilePageCoursesListProps> = ({ courses }): JSX.Element => {
    return courses && courses.length > 0 ? (
        <Row g={3}>
            {courses.map((item, index) => <ProfilePageCourseItem key={item.kk_cup_id} item={item} />)}
        </Row>
    ) : (<Alert className={`p-0`} message={`Ничего не найдено.`} />)
}

type ProfilePageCourseItemProps = {
    item: object | null;
}

const ProfilePageCourseItem: FunctionComponent<ProfilePageCourseItemProps> = ({ item }): JSX.Element => {
    let navigate = useNavigate();
    return item && item.course &&
        <Col key={item.kk_cup_id} xs={12} lg={6} className={`profile-page-course-item`}>
            <CoursesCard
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
                        <Button className={`courses-card-button`} onClick={() => navigate(`/courses/${item.course.kk_course_id}`)}>Продолжить изучение</Button>
                    </React.Fragment>
                }
            />
        </Col>
}

type ProfilePageProps = {
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

const ProfilePage: FunctionComponent<ProfilePageProps> = ({
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
            await dispatch(coursesUsersProgressActions.getAll({
                parts: 'course',
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
            <h1 className={`profile_page_title`}>Профиль</h1>
            <InputError errors={edit_avatar_auth_user_errors} name={'kk_user_avatar'} />

            <div className={`profile_page_user_card`}>
                <div className={`profile_page_user_card_info`}>
                    <div className={`profile_page_mobile_avatar_container`}>
                        <Form className={`profile_page_edit_avatar`}>
                            {edit_avatar_auth_user_loading ? <div className={`profile_page_edit_avatar_loading`}><Loading /></div> : <Label htmlFor={`kk_user_avatar`} className={`profile_page_edit_avatar_button`}><PenOutlineIcon /> </Label>}



                            <TextInput type={'file'} id={`kk_user_avatar`} name={`kk_user_avatar`} className={`profile_page_edit_avatar_input`} onChange={onChangeUserAvatarSubmit} />
                            <Image className={`profile_page_user_card_image`} src={`${config.images.avatars}/${user.kk_user_avatar ? user.kk_user_avatar : config.defaultUserAvatar}`} />


                        </Form>
                        <div className={`profile_page_user_card_actions_mobile`}>
                            <IconButton
                                icon={<PenOutlineIcon />}
                                onClick={() => navigate(`/profile/edit`)}
                            >
                                <div className={`profile_page_user_card_actions_text`}>Редактировать</div>
                            </IconButton>
                            <IconButton
                                icon={<LockKeyOutlineIcon />}
                                disabled={!user.kk_user_email}
                                onClick={() => onSubmitForgotPasswordForm({ kk_user_email: user.kk_user_email })}
                            >
                                <div className={`profile_page_user_card_actions_text`}>Сменить пароль</div>
                            </IconButton>
                        </div>
                    </div>
                    <div className={`profile_page_user_card_text`}>
                        <div><b>{user.kk_user_lastname} {user.kk_user_firstname}</b></div>
                        <div><b>Статус:</b> {user.role.kk_role_name}</div>
                        <div><b>Тел:</b> +7{user.kk_user_phonenumber}</div>
                        <div><b>E-mail:</b> {user.kk_user_email}</div>
                        <div><b>Страна:</b> {user.kk_user_country}</div>
                        <div><b>Город:</b> {user.kk_user_sity}</div>
                    </div>
                </div>
                <div className={`profile_page_user_card_actions`}>
                    <IconButton
                        icon={<PenOutlineIcon />}
                        onClick={() => navigate(`/profile/edit`)}
                    >
                        <div className={`profile_page_user_card_actions_text`}>Редактировать</div>
                    </IconButton>
                    <IconButton
                        icon={<LockKeyOutlineIcon />}
                        disabled={!user.kk_user_email}
                        onClick={() => onSubmitForgotPasswordForm({ kk_user_email: user.kk_user_email })}
                    >
                        <div className={`profile_page_user_card_actions_text`}>Сменить пароль</div>
                    </IconButton>
                </div>
            </div>
            <h1 className={`profile_page_title`}>Мои курсы</h1>
            {get_all_courses_users_progress_loading && <PartLoader />}
            {get_all_courses_users_progress_error && <Alert className={`p-0`} message={get_all_courses_users_progress_error} />}
            <Tabs tabs={[
                {
                    key: 0,
                    menuTitle: 'в процессе',
                    contentComponent: <ProfilePageCoursesList courses={auth_user_inprocess_courses} />
                },
                {
                    key: 1,
                    menuTitle: 'завершенные',
                    contentComponent: <ProfilePageCoursesList courses={auth_user_finished_courses} />
                },
            ]} />
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
const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };