import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, AudioPlayer, Form, IconButton, Alert, Share } from "../../../../public/_components/UI";
import { ArrowLeftIcon, ArrowSquareRightIcon, FileOutlineIcon } from '../../../../public/_components/UI/Icons';
import { lessonsActions, lessonsUsersProgressActions, pagesActions } from "../../../_actions";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import './index.css';
import { FinishCourseButton, FinishLessonModal, PageLoader, Question } from "../../../_components";
import moment from 'moment';
import 'moment/dist/locale/ru';
import { config, getPercentageOfCorrectAnswers, hasTextQuestion } from "../../../_helpers";
import { modalsActions, usersReviewsActions } from "../../../../public/_actions";
import { User, Lesson, LessonUserProgress, CourseUserProgress } from "../../../../public/_interfaces";
import parse from 'html-react-parser';
import { localCoursesUserProgressHelper } from "../../../../public/_helpers";
import { lessonsConstants, lessonsUsersProgressConstants } from "../../../_constants";
import { UsersReviewsForm } from "../../../_components/UsersReviewForm";

type LessonPlaneProps = {
    dispatch: any;
    user: User;

    add_lessons_users_progress_loading: boolean;
    add_lessons_users_progress_message: string | null,
    add_lessons_users_progress_error: string | null,
    add_lessons_users_progress: object | null,

    edit_lessons_users_progress_loading: boolean,
    edit_lessons_users_progress_message: string | null,
    edit_lessons_users_progress_errors: Array<any> | null,
    edit_lessons_users_progress_error_message: string | null,
    edit_lessons_users_progress: object | null,

    remove_lessons_users_progress_loading: boolean;
    remove_lessons_users_progress_message: string | null,
    remove_lessons_users_progress_error: string | null,
    remove_lessons_users_progress: object | null,

    get_one_by_lesson_id_lessons_loading: boolean;
    get_one_by_lesson_id_lessons_message: string | null,
    get_one_by_lesson_id_lessons_error: string | null,
    get_one_by_lesson_id_lessons: Lesson | null,

    get_one_by_lesson_id_lessons_users_progress_loading: boolean;
    get_one_by_lesson_id_lessons_users_progress_message: string | null,
    get_one_by_lesson_id_lessons_users_progress_error: string | null,
    get_one_by_lesson_id_lessons_users_progress: LessonUserProgress | null,

    get_all_by_cup_id_lessons_users_progress_loading: boolean,
    get_all_by_cup_id_lessons_users_progress_message: string | null,
    get_all_by_cup_id_lessons_users_progress_error: string | null,
    get_all_by_cup_id_lessons_users_progress: Array<LessonUserProgress> | null,
}

const LessonPlane: FunctionComponent<LessonPlaneProps> = ({
    dispatch,
    user,
    add_lessons_users_progress_loading,
    add_lessons_users_progress_message,
    add_lessons_users_progress_error,
    add_lessons_users_progress,

    edit_lessons_users_progress_loading,
    edit_lessons_users_progress_message,
    edit_lessons_users_progress_errors,
    edit_lessons_users_progress_error_message,
    edit_lessons_users_progress,

    remove_lessons_users_progress_loading,
    remove_lessons_users_progress_message,
    remove_lessons_users_progress_error,
    remove_lessons_users_progress,

    get_one_by_lesson_id_lessons_loading,
    get_one_by_lesson_id_lessons_message,
    get_one_by_lesson_id_lessons_error,
    get_one_by_lesson_id_lessons,

    get_one_by_lesson_id_lessons_users_progress_loading,
    get_one_by_lesson_id_lessons_users_progress_message,
    get_one_by_lesson_id_lessons_users_progress_error,
    get_one_by_lesson_id_lessons_users_progress,

    get_all_by_cup_id_lessons_users_progress_loading,
    get_all_by_cup_id_lessons_users_progress_message,
    get_all_by_cup_id_lessons_users_progress_error,
    get_all_by_cup_id_lessons_users_progress,
}): JSX.Element => {
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [localError, setLocalError] = useState<string | null>(null)

    const [isOpenFinishLessonModal, setIsOpenFinishLessonModal] = useState<boolean>(false)
    const [lessonToFinishLessonModal, setLessonToFinishLessonModal] = useState<object | null>(null)

    useEffect(() => {
        const init = async () => {
            if (user) {
                if (get_one_by_lesson_id_lessons && get_one_by_lesson_id_lessons.course_users_progress && get_one_by_lesson_id_lessons_users_progress === null) await dispatch(lessonsUsersProgressActions.add({
                    kk_lup_cup_id: get_one_by_lesson_id_lessons.course_users_progress.kk_cup_id,
                    kk_lup_course_id: get_one_by_lesson_id_lessons.kk_lesson_course_id,
                    kk_lup_lesson_id: get_one_by_lesson_id_lessons.kk_lesson_id,
                }))
                else if (get_one_by_lesson_id_lessons_users_progress) await dispatch(lessonsUsersProgressActions.getAllByCupId({ kk_lup_cup_id: get_one_by_lesson_id_lessons_users_progress.kk_lup_cup_id }));
                else console.log(123)
            } else if (get_one_by_lesson_id_lessons) {
                localCoursesUserProgressHelper.createLUP(get_one_by_lesson_id_lessons.kk_lesson_course_id, get_one_by_lesson_id_lessons.kk_lesson_id);
                let new_questions = localCoursesUserProgressHelper.setQUAToReducer(get_one_by_lesson_id_lessons.questions);
                if (new_questions) {
                    let res = {
                        message: 'Запрос выполнен успешно',
                        lesson: {
                            ...get_one_by_lesson_id_lessons,
                            questions: new_questions
                        }
                    }
                    dispatch({ 'type': lessonsConstants.GET_ONE_BY_LESSON_ID_LESSONS_SUCCESS, res })
                }
            }
        }
        init();
    }, []);

    const prefLesson = () => {
        if (get_one_by_lesson_id_lessons?.course?.lessons && get_one_by_lesson_id_lessons.course.lessons.length > 0) {
            let prefLesson = get_one_by_lesson_id_lessons.course.lessons.filter((item) => item.kk_lesson_number === get_one_by_lesson_id_lessons.kk_lesson_number - 1)[0];
            navigate(`/courses/${prefLesson.kk_lesson_course_id}/${prefLesson.kk_lesson_id}`)
        }
    }

    const nextLesson = () => {
        let lup = null;
        if (!user && get_one_by_lesson_id_lessons && localCoursesUserProgressHelper.getOneLUPByCourseIDAndLessonID(get_one_by_lesson_id_lessons.kk_lesson_course_id, get_one_by_lesson_id_lessons.kk_lesson_id)) lup = localCoursesUserProgressHelper.getOneLUPByCourseIDAndLessonID(get_one_by_lesson_id_lessons.kk_lesson_course_id, get_one_by_lesson_id_lessons.kk_lesson_id)
        else if (get_one_by_lesson_id_lessons_users_progress) lup = get_one_by_lesson_id_lessons_users_progress;

        if (lup?.kk_lup_status === "finished") {
            if (get_one_by_lesson_id_lessons?.course?.lessons && get_one_by_lesson_id_lessons.course.lessons.length > 0) {
                let nextLesson = get_one_by_lesson_id_lessons.course.lessons.filter((item) => item.kk_lesson_number === get_one_by_lesson_id_lessons.kk_lesson_number + 1)[0];
                dispatch(usersReviewsActions.init({}))
                navigate(`/courses/${nextLesson.kk_lesson_course_id}/${nextLesson.kk_lesson_id}`)
            }
        } else if (lup?.kk_lup_status === "inprocess") setLocalError("Сначала вам необходимо пройди данный урок!");
        else setLocalError("Ошибка перехода на следующий урок!");
    }

    const onSubmitFinishLessonForm = async (data) => {
        if (user) {
            if (get_one_by_lesson_id_lessons_users_progress) {
                await dispatch(lessonsUsersProgressActions.edit({
                    kk_lup_id: get_one_by_lesson_id_lessons_users_progress.kk_lup_id,
                    kk_lup_finished_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                    kk_lup_status: 'finished',
                    ...data
                }, async () => {
                    await dispatch(lessonsUsersProgressActions.getAllByCupId({ kk_lup_cup_id: get_one_by_lesson_id_lessons_users_progress.kk_lup_cup_id }));
                }))
            }
        } else {
            if (get_one_by_lesson_id_lessons) {
                if (get_one_by_lesson_id_lessons.kk_lesson_number >= 3) navigate(`/registration`);
                else {
                    let lup = localCoursesUserProgressHelper.getOneLUPByCourseIDAndLessonID(get_one_by_lesson_id_lessons.kk_lesson_course_id, get_one_by_lesson_id_lessons.kk_lesson_id)
                    if (lup) {

                        let result = localCoursesUserProgressHelper.prepareQUAAndCreate(lup, data, get_one_by_lesson_id_lessons.questions);
                        console.log(result)
                        if (result?.ok) {


                            localCoursesUserProgressHelper.updateLUP(lup.kk_lup_id, {
                                ...lup,
                                kk_lup_status: 'finished',
                                kk_lup_finished_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                            })
                        } else {
                            let error = result;
                            dispatch({ type: lessonsUsersProgressConstants.EDIT_LESSONS_USERS_PROGRESS_FAILURE, error })
                        }
                    }

                }
            }
        }
    }

    const onEdit = async () => {
        if (user) {
            if (get_one_by_lesson_id_lessons && get_one_by_lesson_id_lessons.course_users_progress && get_one_by_lesson_id_lessons_users_progress) {
                await dispatch(lessonsUsersProgressActions.remove({ kk_lup_id: get_one_by_lesson_id_lessons_users_progress.kk_lup_id }))
                await dispatch(lessonsUsersProgressActions.add({
                    kk_lup_cup_id: get_one_by_lesson_id_lessons.course_users_progress.kk_cup_id,
                    kk_lup_course_id: get_one_by_lesson_id_lessons.kk_lesson_course_id,
                    kk_lup_lesson_id: get_one_by_lesson_id_lessons.kk_lesson_id,
                }))
                await dispatch(lessonsActions.getOneByLessonId({
                    kk_lesson_id: get_one_by_lesson_id_lessons.kk_lesson_id,
                    kk_course_id: get_one_by_lesson_id_lessons.kk_lesson_course_id,
                    parts: 'course,lessons,course_users_progress,questions,answers,user_answer',
                    course_published: 1,
                    lesson_published: 1,
                    lessons_published: 1,
                    parts_to_count: 'lessons'
                }))
            }
        } else navigate(`/registration`)
    }

    return (
        get_one_by_lesson_id_lessons ?
            <React.Fragment>
                {/* <h3 className={`lesson_page_title text-primary mb-3`}>{lesson?.course?.kk_course_name}</h3> */}
                <h3 className={`lesson_page_title text-primary`}>{get_one_by_lesson_id_lessons?.course?.kk_course_name}</h3>
                <p>{typeof get_one_by_lesson_id_lessons?.course?.kk_course_description === 'string' && parse(get_one_by_lesson_id_lessons?.course?.kk_course_description)}</p>
                <h4 className={`lesson_page_title`}>Урок {get_one_by_lesson_id_lessons?.kk_lesson_number}. <span className={`text-primary`}>{get_one_by_lesson_id_lessons?.kk_lesson_name}</span></h4>
                <FinishLessonModal
                    isOpen={isOpenFinishLessonModal}
                    setIsOpen={setIsOpenFinishLessonModal}
                    lesson={get_one_by_lesson_id_lessons_users_progress}
                    nextLesson={nextLesson}
                    onEdit={onEdit}
                    kk_course_id={get_one_by_lesson_id_lessons.kk_lesson_course_id}
                />

                <Row g={5}>
                    <Col xs={12} lg={10} className={`lesson_page_description`}>{typeof get_one_by_lesson_id_lessons.kk_lesson_description === 'string' ? parse(get_one_by_lesson_id_lessons.kk_lesson_description) : <React.Fragment></React.Fragment>}</Col>
                    <Col xs={12} lg={2} className={`lesson_page_sub_info_container`}>
                        <div className={`lesson_page_sub_info`}>
                            <div className={`lesson_page_sub_info_item`}><FileOutlineIcon /><b>Урок {get_one_by_lesson_id_lessons.kk_lesson_number}</b></div>
                            {/* <div className={`lesson_page_sub_info_item`}><FileOutlineIcon /><b>Урок {get_one_by_lesson_id_lessons.kk_lesson_number}</b></div> */}
                        </div>
                    </Col>
                    {get_one_by_lesson_id_lessons.kk_lesson_audio ?
                        <React.Fragment>
                            <Col xs={12} lg={7}>
                                <div className={`lesson_page_audio_title`}>Аудио версия урока</div>
                                <AudioPlayer src={get_one_by_lesson_id_lessons.kk_lesson_audio} />
                            </Col>
                            <Col xs={12} lg={5}>
                                <div className={`lesson_page_audio_text`}>
                                    <ArrowLeftIcon />
                                    слушать аудио версию урока
                                </div>
                            </Col>
                        </React.Fragment> : <React.Fragment></React.Fragment>
                    }
                    <Col xs={12} lg={12}>{typeof get_one_by_lesson_id_lessons.kk_lesson_text === 'string' ? parse(get_one_by_lesson_id_lessons.kk_lesson_text) : <React.Fragment></React.Fragment>}</Col>
                    <Form onSubmit={handleSubmit(onSubmitFinishLessonForm)}>
                        {get_one_by_lesson_id_lessons.questions && get_one_by_lesson_id_lessons.questions.length > 0 ?
                            <div className={`lesson_page_test_container`}>
                                <h3 className={`lesson_page_test_title`}>Тест</h3>
                                {get_one_by_lesson_id_lessons.questions.map((question, index) => <Question key={question.kk_question_id} question={question} register={register} errors={edit_lessons_users_progress_errors} />)}
                            </div> : <React.Fragment></React.Fragment>
                        }
                        {localError ? <Alert message={localError} type={'danger'} className={`lesson_page_actions_error_alert`} /> : <React.Fragment></React.Fragment>}
                        {edit_lessons_users_progress_error_message ? <Alert message={edit_lessons_users_progress_error_message} type={'danger'} className={`lesson_page_actions_error_alert`} /> : <React.Fragment></React.Fragment>}
                        <Row g={3} className={`mb-3`}>
                            <Col xs={12} lg={6}>
                                <div className="lesson_page_actions_container">
                                    <IconButton type={`button`} className={`lesson_page_actions_prev_lesson`} icon={<ArrowSquareRightIcon />} onClick={prefLesson} disabled={get_one_by_lesson_id_lessons.kk_lesson_number <= 1 || add_lessons_users_progress_loading}>Предыдущий урок</IconButton>
                                    <IconButton type={`button`} className={`lesson_page_actions_next_lesson`} icon={<ArrowSquareRightIcon />} onClick={nextLesson} disabled={get_one_by_lesson_id_lessons.kk_lesson_number === get_one_by_lesson_id_lessons.course?.lessons_count || add_lessons_users_progress_loading || (!user && get_one_by_lesson_id_lessons.kk_lesson_number >= 3)}>Следующий урок</IconButton>
                                </div>
                            </Col>
                            <Col xs={12} lg={6}>
                                {(get_one_by_lesson_id_lessons_users_progress?.kk_lup_status === 'finished') || (!user && localCoursesUserProgressHelper.getOneLUPByCourseIDAndLessonID(get_one_by_lesson_id_lessons.kk_lesson_course_id, get_one_by_lesson_id_lessons.kk_lesson_id)?.kk_lup_status === 'finished') ?
                                    <div className={`lesson_page_finished_lesson_plane`}>
                                        <h5 className={`lesson_page_finished_lesson_plane_title`}>Урок пройден</h5>
                                        Дата и время прохождения: {get_one_by_lesson_id_lessons_users_progress ? moment(get_one_by_lesson_id_lessons_users_progress?.kk_lup_finished_at).locale('ru').format('Do MMMM YYYY, HH:mm') : (
                                            !user && localCoursesUserProgressHelper.getOneLUPByCourseIDAndLessonID(get_one_by_lesson_id_lessons.kk_lesson_course_id, get_one_by_lesson_id_lessons.kk_lesson_id) ? moment(localCoursesUserProgressHelper.getOneLUPByCourseIDAndLessonID(get_one_by_lesson_id_lessons.kk_lesson_course_id, get_one_by_lesson_id_lessons.kk_lesson_id)?.kk_lup_finished_at).locale('ru').format('Do MMMM YYYY, HH:mm') : null
                                        )}

                                        {get_one_by_lesson_id_lessons.questions && get_one_by_lesson_id_lessons.questions.length > 0 && !hasTextQuestion(get_one_by_lesson_id_lessons.questions) && <p>Верных ответов: {getPercentageOfCorrectAnswers(get_one_by_lesson_id_lessons.questions)}</p>}
                                    </div>
                                    :
                                    <Button
                                        type="submit"
                                        loading={edit_lessons_users_progress_loading}
                                        disabled={edit_lessons_users_progress_loading}
                                        className={`lesson_page_submit_button`}
                                    >
                                        {get_one_by_lesson_id_lessons.questions && get_one_by_lesson_id_lessons.questions.length > 0 ? `Отправить на проверку` : `Пройти урок`}
                                    </Button>
                                }
                                <FinishCourseButton lesson={get_one_by_lesson_id_lessons} lessons_users_progress={get_all_by_cup_id_lessons_users_progress} />
                            </Col>
                        </Row>
                    </Form>

                    {get_one_by_lesson_id_lessons_users_progress?.kk_lup_status === 'finished' || (!user && localCoursesUserProgressHelper.getOneLUPByCourseIDAndLessonID(get_one_by_lesson_id_lessons.kk_lesson_course_id, get_one_by_lesson_id_lessons.kk_lesson_id)?.kk_lup_status === 'finished') ?
                        <Row g={3} >
                            <Col xs={12} lg={6}><Button className="w-100" onClick={onEdit} loading={remove_lessons_users_progress_loading} disabled={remove_lessons_users_progress_loading || !(get_one_by_lesson_id_lessons.questions && get_one_by_lesson_id_lessons.questions.length > 0) || !user}>Повторить тест</Button></Col>
                            <Col xs={12} lg={6}><Button className="w-100" onClick={() => navigate(`/`)}>Завершить занятие</Button></Col>
                            <Col xs={12} lg={6}><Button className="w-100" onClick={() => navigate(`/contacts`)}>Задать вопрос</Button></Col>
                            <Col xs={12} lg={6}><Button className="w-100" onClick={() => dispatch(modalsActions.openDonateModal(true))}>Поддержать сайт</Button></Col>
                            <Col xs={12} lg={12}>Поделиться:<br /><Share className={`mt-3`} link={`${config.appUrl}/courses/${get_one_by_lesson_id_lessons.kk_lesson_course_id}`} whatsapp viber telegram sms copy /></Col>
                            <Col xs={12} lg={12}><UsersReviewsForm kk_lesson_id={get_one_by_lesson_id_lessons.kk_lesson_id} /></Col>
                        </Row> : <React.Fragment></React.Fragment>
                    }

                </Row>
            </React.Fragment> : <React.Fragment></React.Fragment>

    );
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
        add_lessons_users_progress_loading,
        add_lessons_users_progress_message,
        add_lessons_users_progress_error,
        add_lessons_users_progress,

        edit_lessons_users_progress_loading,
        edit_lessons_users_progress_message,
        edit_lessons_users_progress_errors,
        edit_lessons_users_progress_error_message,
        edit_lessons_users_progress,

        remove_lessons_users_progress_loading,
        remove_lessons_users_progress_message,
        remove_lessons_users_progress_error,
        remove_lessons_users_progress,

        get_one_by_lesson_id_lessons_users_progress_loading,
        get_one_by_lesson_id_lessons_users_progress_message,
        get_one_by_lesson_id_lessons_users_progress_error,
        get_one_by_lesson_id_lessons_users_progress,

        get_all_by_cup_id_lessons_users_progress_loading,
        get_all_by_cup_id_lessons_users_progress_message,
        get_all_by_cup_id_lessons_users_progress_error,
        get_all_by_cup_id_lessons_users_progress,
    } = state.lessons_users_progress;
    return {
        user,
        add_lessons_users_progress_loading,
        add_lessons_users_progress_message,
        add_lessons_users_progress_error,
        add_lessons_users_progress,

        edit_lessons_users_progress_loading,
        edit_lessons_users_progress_message,
        edit_lessons_users_progress_errors,
        edit_lessons_users_progress_error_message,
        edit_lessons_users_progress,

        remove_lessons_users_progress_loading,
        remove_lessons_users_progress_message,
        remove_lessons_users_progress_error,
        remove_lessons_users_progress,

        get_one_by_lesson_id_lessons_loading,
        get_one_by_lesson_id_lessons_message,
        get_one_by_lesson_id_lessons_error,
        get_one_by_lesson_id_lessons,

        get_one_by_lesson_id_lessons_users_progress_loading,
        get_one_by_lesson_id_lessons_users_progress_message,
        get_one_by_lesson_id_lessons_users_progress_error,
        get_one_by_lesson_id_lessons_users_progress,

        get_all_by_cup_id_lessons_users_progress_loading,
        get_all_by_cup_id_lessons_users_progress_message,
        get_all_by_cup_id_lessons_users_progress_error,
        get_all_by_cup_id_lessons_users_progress,
    };
}
const connectedLessonPlane = connect(mapStateToProps)(LessonPlane);
export { connectedLessonPlane as LessonPlane };