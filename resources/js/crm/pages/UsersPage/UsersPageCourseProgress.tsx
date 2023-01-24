import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { connect } from 'react-redux';
import { Button, Col, Form, Image, Row, Label, InputGroup, TextInput, InputError, TextArea, Alert, InputGroupText, ControlledSelect, Checkbox, IconButton, Tabs, ProgressBar, List, ListItem } from '../../_components/UI';
import { ArrowLeftIcon, ArrowSquareRightIcon, DoneCircleIcon, FileOutlineIcon, PenIcon, XCircleIcon } from '../../_components/UI/Icons';

import { User } from '../../_interfaces';
import { usersActions, pagesActions, settingsActions, lessonsUsersProgressActions, lessonsActions } from "../../_actions";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import './index.css';
import { CoursesCard, FinishCourseButton, ImageDropzone, PageLoader, PartLoader, Question, TextEditor } from "../../_components";
import { NoMatchPage } from "../";
import moment from 'moment';
import 'moment/dist/locale/ru';
import { config } from "../../_helpers";
import { getLastInprocessLesson } from "../../../src/_helpers";




type UsersPageCourseProgressProps = {
    dispatch: any;
    user: User;

    get_one_by_user_id_users_loading: boolean,
    get_one_by_user_id_users_message: string | null,
    get_one_by_user_id_users_error: string | null,
    get_one_by_user_id_users: Array<object> | null,

    get_one_by_lesson_id_lessons_loading: boolean,
    get_one_by_lesson_id_lessons_message: string | null,
    get_one_by_lesson_id_lessons_error: string | null,
    get_one_by_lesson_id_lessons: object | null,

    edit_lessons_users_progress_loading: boolean,
    edit_lessons_users_progress_message: string | null,
    edit_lessons_users_progress_errors: object[],
    edit_lessons_users_progress_error_message: string | null,
    edit_lessons_users_progress: object | null,
}

const UsersPageCourseProgress: FunctionComponent<UsersPageCourseProgressProps> = ({
    dispatch,
    user,

    get_one_by_user_id_users_loading,
    get_one_by_user_id_users_message,
    get_one_by_user_id_users_error,
    get_one_by_user_id_users,

    get_one_by_lesson_id_lessons_loading,
    get_one_by_lesson_id_lessons_message,
    get_one_by_lesson_id_lessons_error,
    get_one_by_lesson_id_lessons,

    edit_lessons_users_progress_loading,
    edit_lessons_users_progress_message,
    edit_lessons_users_progress_errors,
    edit_lessons_users_progress_error_message,
    edit_lessons_users_progress,
}): JSX.Element => {
    let navigate = useNavigate();
    let { kk_course_id, kk_user_id } = useParams();
    const [searchParams] = useSearchParams();
    let kk_lesson_id = searchParams.get('kk_lesson_id')

    const [loading, setLoading] = useState(true);
    const [noMatch, setNoMatch] = useState(false);


    useEffect(() => {
        const init = async () => {
            await dispatch(pagesActions.openPage())
            await dispatch(usersActions.getOneByUserId({
                kk_course_id: kk_course_id,
                kk_user_id: kk_user_id,
                parts: 'role,admin,coordinator,pastor,teather,promouter,course_user_progress,course,lessons,lessons_users_progress,lesson_users_progress',
                parts_to_count: 'lessons,lessons_users_progress',
                lessons_users_progress_status: 'finished',
            }));
            if(kk_lesson_id) dispatch(lessonsActions.getOneByLessonId({
                kk_lesson_id: kk_lesson_id,
                kk_user_id: kk_user_id,
                parts: 'lesson_users_progress,questions,answers,user_answer',
            }))

            setLoading(false)
        }
        init();
    }, [kk_user_id]);

    const editLessonUserProgress = async (lup) => {
        await dispatch(lessonsUsersProgressActions.edit({
            kk_lup_id: lup?.kk_lup_id,
            kk_lup_user_id: lup?.kk_lup_user_id,
            kk_lup_status: lup?.kk_lup_status,
            kk_lup_checked: lup?.kk_lup_checked,
            kk_lup_finished_at: lup?.kk_lup_finished_at,
            check_questions: 0,
        }))
    }


    if (noMatch) return <NoMatchPage />
    if (loading || get_one_by_user_id_users_loading) return <PageLoader />
    return (
        <div className={`users_course_progress_page`}>
            <div className={`users_info_page_title_container`}>
                <h1 className={`crm_panel_page_title`}>
                    <a className={`cursor-pointer`} onClick={() => navigate(`/users`)}>Пользователи |</a>
                    <a className={`cursor-pointer`} onClick={() => navigate(`/users/info/${kk_user_id}`)}> {`"${get_one_by_user_id_users?.kk_user_lastname} ${get_one_by_user_id_users?.kk_user_firstname}"`} |</a>
                    <span> Прогресс курса: {get_one_by_user_id_users?.course_user_progress?.course?.kk_course_name}</span> </h1>
            </div>
            <Row g={3}>
                <Col xs={12} lg={3}>
                    <List
                        className={`users_course_progress_page_list`}
                        dataSource={get_one_by_user_id_users?.course_user_progress?.course?.lessons}
                        renderItem={(lesson, index) =>
                            <ListItem
                                itemTitle={`${lesson.kk_lesson_number}. ${lesson.kk_lesson_name}`}
                                itemDescription={
                                    <React.Fragment>
                                        {lesson?.lesson_users_progress?.kk_lup_status === 'inprocess' && <div className={'text-warning'}>В процессе</div>}
                                        {lesson?.lesson_users_progress?.kk_lup_status === 'finished' && <div>
                                            <span className={'text-primary'}>Завершен</span> | {lesson?.lesson_users_progress?.kk_lup_checked === 0 ? <span className={'text-danger'}>Не проверен</span> : <span className={'text-primary'}>Проверен</span>}
                                        </div>}
                                        {lesson?.lesson_users_progress?.kk_lup_started_at && <div className="w-100">Дата старта: {moment(lesson?.lesson_users_progress?.kk_lup_started_at).format('DD.MM.YYYY HH:mm:ss')}</div>}
                                        {lesson?.lesson_users_progress?.kk_lup_finished_at && <div className="w-100">Дата финиша: {moment(lesson?.lesson_users_progress?.kk_lup_finished_at).format('DD.MM.YYYY HH:mm:ss')}</div>}
                                    </React.Fragment>
                                }
                                onClick={() => dispatch(lessonsActions.getOneByLessonId({
                                    kk_lesson_id: lesson?.kk_lesson_id,
                                    kk_user_id: kk_user_id,
                                    parts: 'lesson_users_progress,questions,answers,user_answer',
                                }))}
                            />
                        }
                    />
                </Col>
                <Col xs={12} lg={9}>
                    {get_one_by_lesson_id_lessons_loading && <PartLoader />}
                    {get_one_by_lesson_id_lessons_error && <div className={`d-flex justify-content-center`}><Alert className={`text-center`} type={`danger`} message={get_one_by_lesson_id_lessons_error} /></div>}
                    {!get_one_by_lesson_id_lessons && !get_one_by_lesson_id_lessons_error && !get_one_by_lesson_id_lessons_loading && <div className={`d-flex justify-content-center`}><Alert className={`text-center`} type={`info`} message={'Пожалуйста выберите урок.'} /></div>}
                    {get_one_by_lesson_id_lessons ? <div className={`users_course_progress_page_selected_lesson_container`}>
                        <div className={`users_course_progress_page_selected_lesson_header`}>
                            <h3 className={`m-0`}>{`${get_one_by_lesson_id_lessons.kk_lesson_number}. ${get_one_by_lesson_id_lessons.kk_lesson_name}`}</h3>
                            <b>
                                {get_one_by_lesson_id_lessons?.lesson_users_progress?.kk_lup_status === 'inprocess' && <div className={'text-warning'}>В процессе</div>}
                                {get_one_by_lesson_id_lessons?.lesson_users_progress?.kk_lup_status === 'finished' && <div><span className={'text-primary'}>Завершен</span> | {get_one_by_lesson_id_lessons?.lesson_users_progress?.kk_lup_checked === 0 ? <span className={'text-danger'}>Не проверен</span> : <span className={'text-primary'}>Проверен</span>}</div>}
                            </b>
                        </div>
                        <div className={`users_course_progress_page_selected_lesson_body`}>
                            {get_one_by_lesson_id_lessons?.questions?.length > 0 ?
                                <React.Fragment>
                                    {get_one_by_lesson_id_lessons?.lesson_users_progress?.kk_lup_status === 'finished' &&
                                        get_one_by_lesson_id_lessons?.lesson_users_progress?.kk_lup_checked === 0 ? (
                                        <Button
                                            color={`primary`}
                                            className={`mb-3`}
                                            onClick={() => editLessonUserProgress({ ...get_one_by_lesson_id_lessons?.lesson_users_progress, kk_lup_checked: 1 })}
                                            loading={edit_lessons_users_progress_loading}
                                            disabled={edit_lessons_users_progress_loading}
                                        >Отметить как провереный</Button>
                                    ) : (
                                        <Button
                                            className={`mb-3`}
                                            onClick={() => editLessonUserProgress({ ...get_one_by_lesson_id_lessons?.lesson_users_progress, kk_lup_checked: 0 })}
                                            loading={edit_lessons_users_progress_loading}
                                            disabled={edit_lessons_users_progress_loading}
                                        >Отметить как не провереный</Button>
                                    )
                                    }
                                    {edit_lessons_users_progress_error_message && <Alert type={`danger`} message={edit_lessons_users_progress_error_message} />}
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Вопрос</th>
                                                <th>Тип</th>
                                                <th colSpan={4}>Ответы</th>
                                            </tr>
                                            <tr>
                                                <th colSpan={2}></th>
                                                <th>Ответ</th>
                                                <th>Верный ответ</th>
                                                <th>Ответ пользователя</th>
                                                <th>Проверка</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {get_one_by_lesson_id_lessons?.questions.map((question, index) =>
                                                <React.Fragment>
                                                    <tr key={question.kk_question_id} >
                                                        <td rowSpan={question?.answers?.length + 1}>{question.kk_question_text}</td>
                                                        <td rowSpan={question?.answers?.length + 1}>
                                                            {question.kk_question_type === 'radio' && 'Один верный ответ'}
                                                            {question.kk_question_type === 'checkbox' && 'Несколько верных ответов'}
                                                            {question.kk_question_type === 'text' && 'Текстовый ответ'}
                                                        </td>
                                                    </tr>
                                                    {question?.answers?.length > 0 ? question?.answers.map((answer, index) =>
                                                        <tr key={answer.kk_qa_id}>
                                                            <td>{answer.kk_qa_text}</td>
                                                            <td className="text-center">
                                                                {question.kk_question_type !== 'text' && answer.kk_qa_correct === 1 ? <DoneCircleIcon size={20} color={'rgba(var(--text-success),1)'} /> : null}
                                                                {question.kk_question_type !== 'text' && answer.kk_qa_correct === 0 ? <XCircleIcon size={20} color={'rgba(var(--text-danger),1)'} /> : null}
                                                            </td>
                                                            <td>{answer.user_answer ? question.kk_question_type === 'text' ? answer.user_answer.kk_qua_text : <DoneCircleIcon size={20} color={'rgba(var(--text-success),1)'} /> : null}</td>
                                                            <td className="text-center">
                                                                {answer.user_answer && question.kk_question_type === 'text' ?
                                                                    <IconButton
                                                                        icon={answer.user_answer.kk_qua_correct === 1 ? <DoneCircleIcon size={20} color={'rgba(var(--text-success),1)'} /> : <XCircleIcon size={20} color={'rgba(var(--text-danger),1)'} />}
                                                                        onClick={() => dispatch(lessonsActions.editQuestionUserAnswer({ kk_qua_id: answer.user_answer.kk_qua_id, kk_qua_correct: answer.user_answer.kk_qua_correct === 1 ? 0 : 1 }))}
                                                                    />
                                                                    : null}
                                                            </td>
                                                        </tr>)
                                                        : <Alert className={`text-center`} type={`info`} message={'В этом вопросе нет ответов!'} />}
                                                </React.Fragment>
                                            )}
                                        </tbody>
                                    </table>
                                </React.Fragment>
                                : <Alert className={`text-center`} type={`info`} message={'В этом уроке нет теста!'} />}
                        </div>
                    </div> : ''}
                </Col>
            </Row>
        </div >
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
    const {
        get_one_by_lesson_id_lessons_loading,
        get_one_by_lesson_id_lessons_message,
        get_one_by_lesson_id_lessons_error,
        get_one_by_lesson_id_lessons,
    } = state.lessons;
    const {
        edit_lessons_users_progress_loading,
        edit_lessons_users_progress_message,
        edit_lessons_users_progress_errors,
        edit_lessons_users_progress_error_message,
        edit_lessons_users_progress,
    } = state.lessons_users_progress;
    return {
        user,

        get_one_by_user_id_users_loading,
        get_one_by_user_id_users_message,
        get_one_by_user_id_users_error,
        get_one_by_user_id_users,

        get_one_by_lesson_id_lessons_loading,
        get_one_by_lesson_id_lessons_message,
        get_one_by_lesson_id_lessons_error,
        get_one_by_lesson_id_lessons,

        edit_lessons_users_progress_loading,
        edit_lessons_users_progress_message,
        edit_lessons_users_progress_errors,
        edit_lessons_users_progress_error_message,
        edit_lessons_users_progress,
    };
}
const connectedUsersPageCourseProgress = connect(mapStateToProps)(UsersPageCourseProgress);
export { connectedUsersPageCourseProgress as UsersPageCourseProgress };