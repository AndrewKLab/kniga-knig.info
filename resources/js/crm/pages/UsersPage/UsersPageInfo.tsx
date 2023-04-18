import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { connect } from 'react-redux';
import { Button, Col, Form, Image, Row, Label, InputGroup, TextInput, InputError, TextArea, Alert, InputGroupText, ControlledSelect, Checkbox, IconButton, Tabs, ProgressBar } from '../../_components/UI';
import { ArrowLeftIcon, ArrowSquareRightIcon, ChatIcon, FileOutlineIcon, PenIcon } from '../../_components/UI/Icons';

import { User } from '../../_interfaces';
import { usersActions, pagesActions, settingsActions, chatsActions } from "../../_actions";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import './index.css';
import { CoursesCard, FinishCourseButton, ImageDropzone, PageLoader, Question, TextEditor } from "../../_components";
import { NoMatchPage } from "../";
import moment from 'moment';
import 'moment/dist/locale/ru';
import { config } from "../../_helpers";
import { getLastInprocessLesson } from "../../../src/_helpers";


type UsersPageInfoCoursesListProps = {
    kk_user_id: number;
    courses: Array<any> | null;
}

const UsersPageInfoCoursesList: FunctionComponent<UsersPageInfoCoursesListProps> = ({ kk_user_id, courses }): JSX.Element => {
    let navigate = useNavigate();
    return courses && courses.length > 0 ? (
        <Row g={3}>
            {courses.map((item, index) => <Col key={item.kk_cup_id} xs={12} lg={3} className={`profile-page-course-item`}>
                <CoursesCard
                    coursesCardImage={item?.course?.kk_course_image}
                    coursesCardTitle={item?.course?.kk_course_name}
                    coursesCardSubtitle={
                        <React.Fragment>
                            <div>{`${item?.course?.lessons_count} уроков`}</div>
                            <div className={`courses-card-progress`}>
                                Пройдено
                                <ProgressBar progress={(item?.course?.lessons_users_progress_count / item?.course?.lessons_count)} />
                                <div>{item?.course?.lessons_users_progress_count} из {item?.course?.lessons_count}</div>
                            </div>
                            <Button onClick={() => navigate(`/users/info/course_progress/${item?.course?.kk_course_id}/${kk_user_id}`)}>Подробнее</Button>
                        </React.Fragment>
                    }
                />
            </Col>
            )}
        </Row>
    ) : (<Alert className={`p-0`} message={`Ничего не найдено.`} />)
}

type UsersPageInfoProps = {
    dispatch: any;
    user: User;

    get_one_by_user_id_users_loading: boolean,
    get_one_by_user_id_users_message: string | null,
    get_one_by_user_id_users_error: string | null,
    get_one_by_user_id_users: Array<object> | null,

}

const UsersPageInfo: FunctionComponent<UsersPageInfoProps> = ({
    dispatch,
    user,

    get_one_by_user_id_users_loading,
    get_one_by_user_id_users_message,
    get_one_by_user_id_users_error,
    get_one_by_user_id_users,

}): JSX.Element => {
    let navigate = useNavigate();
    let { kk_user_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [noMatch, setNoMatch] = useState(false);


    useEffect(() => {
        const init = async () => {
            await dispatch(pagesActions.openPage())
            await dispatch(usersActions.getOneByUserId({
                kk_user_id:
                    kk_user_id,
                parts: 'role,admin,coordinator,pastor,teather,promouter,courses_user_progress,course,lessons,lessons_users_progress',
                parts_to_count: 'lessons,lessons_users_progress',
                lessons_users_progress_status: 'finished',
            }));

            setLoading(false)
        }
        init();
    }, [kk_user_id]);

    const openChat = (user) => {
        dispatch(chatsActions.create({ kk_user_id: user.kk_user_id })).then((res) => {
            if (res?.error?.message === 'Такой чат уже существует!') navigate(`/chats/${res?.error?.chat?.kk_chat_id}`)
            if (res?.res?.chat) navigate(`/chats/${res?.res?.chat?.kk_chat_id}`)
        });
    }


    if (noMatch) return <NoMatchPage />
    if (loading || get_one_by_user_id_users_loading) return <PageLoader />
    return (
        <div className={`users_info_page`}>
            <div className={`users_info_page_title_container`}>
                <h1 className={`crm_panel_page_title`}><a className={`cursor-pointer`} onClick={() => navigate(`/users`)}>Пользователи |</a>  <span>{`"${get_one_by_user_id_users?.kk_user_lastname} ${get_one_by_user_id_users?.kk_user_firstname}"`} </span> </h1>
                <div className="d-flex gap-3">
                    <IconButton icon={<ChatIcon size={30} color={`rgba(var(--alert-success-color), 1)`} />} title="Перейти к диалогу с пользователем" onClick={() => openChat(get_one_by_user_id_users)} />
                    <IconButton icon={<PenIcon size={30} color={`rgba(var(--alert-warning-color), 1)`} />} title="Изменить" onClick={() => navigate(`/users/action/edit/${get_one_by_user_id_users?.kk_user_id}`)} />
                </div>
            </div>
            <div className={`users_info_page_user_card`}>
                <Row g={3}>
                    <Col xs={12} lg={2}>
                        <Image className={`users_info_page_user_card_image`} src={`${config.images.avatars}/${get_one_by_user_id_users?.kk_user_avatar ? get_one_by_user_id_users?.kk_user_avatar : config.defaultUserAvatar}`} />
                    </Col>
                    <Col xs={12} lg={10}>
                        <Row g={3}>
                            <Col xs={12} lg={12}><h1 className={`users_info_page_user_card_title`}>{get_one_by_user_id_users?.kk_user_lastname} {get_one_by_user_id_users?.kk_user_firstname} {get_one_by_user_id_users?.kk_user_middlename}</h1></Col>
                            <Col xs={12} lg={4} className={'mb-3'}>
                                <table className={'table users_info_page_table'}>
                                    <tbody>
                                        <tr>
                                            <th>Номер телефона:</th>
                                            <td>+7{get_one_by_user_id_users?.kk_user_phonenumber}</td>
                                        </tr>
                                        <tr>
                                            <th>E-mail:</th>
                                            <td>{get_one_by_user_id_users?.kk_user_email}</td>
                                        </tr>
                                        <tr>
                                            <th>Страна:</th>
                                            <td>{get_one_by_user_id_users?.kk_user_country}</td>
                                        </tr>
                                        <tr>
                                            <th>Город:</th>
                                            <td>{get_one_by_user_id_users?.kk_user_sity}</td>
                                        </tr>
                                        <tr>
                                            <th>Организация:</th>
                                            <td>{get_one_by_user_id_users?.kk_user_commune}</td>
                                        </tr>
                                        <tr>
                                            <th>Оффлайн пользователь:</th>
                                            <td>{get_one_by_user_id_users?.kk_user_offline_user === 0 ? 'Нет' : 'Да'}</td>
                                        </tr>
                                        <tr>
                                            <th>Дата регистрации:</th>
                                            <td>{moment(get_one_by_user_id_users?.kk_user_created_at).format('DD.MM.YYYY HH:mm')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                            <Col xs={12} lg={4}>
                                <table className={'table users_info_page_table'}>
                                    <tbody>
                                        <tr>
                                            <th>Роль:</th>
                                            <td>{get_one_by_user_id_users?.role?.kk_role_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Администратор:</th>
                                            <td>{get_one_by_user_id_users?.admin?.kk_user_lastname} {get_one_by_user_id_users?.admin?.kk_user_firstname}</td>
                                        </tr>
                                        <tr>
                                            <th>Координатор:</th>
                                            <td>{get_one_by_user_id_users?.coordinator?.kk_user_lastname} {get_one_by_user_id_users?.coordinator?.kk_user_firstname}</td>
                                        </tr>
                                        <tr>
                                            <th>Пастор:</th>
                                            <td>{get_one_by_user_id_users?.pastor?.kk_user_lastname} {get_one_by_user_id_users?.pastor?.kk_user_firstname}</td>
                                        </tr>
                                        <tr>
                                            <th>Учитель:</th>
                                            <td>{get_one_by_user_id_users?.teather?.kk_user_lastname} {get_one_by_user_id_users?.teather?.kk_user_firstname}</td>
                                        </tr>
                                        <tr>
                                            <th>Сеятель:</th>
                                            <td>{get_one_by_user_id_users?.promouter?.kk_user_lastname} {get_one_by_user_id_users?.promouter?.kk_user_firstname}</td>
                                        </tr>
                                        <tr>
                                            <th>Дата обновления:</th>
                                            <td>{moment(get_one_by_user_id_users?.kk_user_updated_at).format('DD.MM.YYYY HH:mm')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <h2>Прогресс пользователя:</h2>
            {
                get_one_by_user_id_users?.courses_user_progress?.length > 0 ?
                    <Tabs tabs={[
                        {
                            key: 0,
                            menuTitle: 'в процессе',
                            contentComponent: <UsersPageInfoCoursesList kk_user_id={kk_user_id} courses={get_one_by_user_id_users?.courses_user_progress.filter(course => course.kk_cup_status === 'inprocess')} />
                        },
                        {
                            key: 1,
                            menuTitle: 'завершенные',
                            contentComponent: <UsersPageInfoCoursesList kk_user_id={kk_user_id} courses={get_one_by_user_id_users?.courses_user_progress.filter(course => course.kk_cup_status === 'finished')} />
                        },
                    ]} /> : 'Пользователь пока не начал проходить курсы!'
            }
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {

        get_one_by_user_id_users_loading,
        get_one_by_user_id_users_message,
        get_one_by_user_id_users_error,
        get_one_by_user_id_users,

    } = state.users;
    return {
        user,

        get_one_by_user_id_users_loading,
        get_one_by_user_id_users_message,
        get_one_by_user_id_users_error,
        get_one_by_user_id_users,
    };
}
const connectedUsersPageInfo = connect(mapStateToProps)(UsersPageInfo);
export { connectedUsersPageInfo as UsersPageInfo };