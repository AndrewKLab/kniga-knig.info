import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, AudioPlayer, Form, IconButton, Alert, Share } from "../../../../public/_components/UI";
import { ArrowLeftIcon, ArrowSquareRightIcon, FileOutlineIcon } from '../../../../public/_components/UI/Icons';
import { User } from '../../../_interfaces';
import { lessonsActions, lessonsUsersProgressActions, pagesActions } from "../../../_actions";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import './index.css';
import { FinishCourseButton, FinishLessonModal, PageLoader, Question } from "../../../_components";
import { NoMatchPage } from "../../";
import moment from 'moment';
import 'moment/dist/locale/ru';
import { config, getPercentageOfCorrectAnswers, hasTextQuestion } from "../../../_helpers";
import { DonateButton, DonateModal } from "../../../../public/_components";
import { modalsActions } from "../../../../public/_actions";


type LessonPageProps = {
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
    get_one_by_lesson_id_lessons: any,

    get_one_by_lesson_id_lessons_users_progress_loading: boolean;
    get_one_by_lesson_id_lessons_users_progress_message: string | null,
    get_one_by_lesson_id_lessons_users_progress_error: string | null,
    get_one_by_lesson_id_lessons_users_progress: object | null,

    get_all_by_cup_id_lessons_users_progress_loading: boolean,
    get_all_by_cup_id_lessons_users_progress_message: string | null,
    get_all_by_cup_id_lessons_users_progress_error: string | null,
    get_all_by_cup_id_lessons_users_progress: Array<any> | null,
}

const LessonPage: FunctionComponent<LessonPageProps> = ({
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
            } else await dispatch(lessonsActions.getFirstByCourseId({
                kk_lesson_course_id: kk_course_id,
                parts: 'course,lessons,questions,answers',
                course_published: 1,
                lesson_published: 1,
                lessons_published: 1,
                parts_to_count: 'lessons'
            }))


            setLoading(false)
        }
        init();
    }, [kk_course_id, kk_lesson_id]);


    if (loading || get_one_by_lesson_id_lessons_loading || get_one_by_lesson_id_lessons_users_progress_loading) return <PageLoader />
    else return get_one_by_lesson_id_lessons ? (
        <div className={`lesson_page`}>
            <LessonPlane
                dispatch={dispatch}
                user={user}
                lesson={get_one_by_lesson_id_lessons}
                lesson_users_progress={get_one_by_lesson_id_lessons_users_progress}
                get_all_by_cup_id_lessons_users_progress={get_all_by_cup_id_lessons_users_progress}
                add_lessons_users_progress_loading={add_lessons_users_progress_loading}
                remove_lessons_users_progress_loading={remove_lessons_users_progress_loading}
                edit_lessons_users_progress_loading={edit_lessons_users_progress_loading}
                edit_lessons_users_progress_message={edit_lessons_users_progress_message}
                edit_lessons_users_progress_errors={edit_lessons_users_progress_errors}
                edit_lessons_users_progress_error_message={edit_lessons_users_progress_error_message}
                edit_lessons_users_progress={edit_lessons_users_progress}
            />
        </div>
    ) : <NoMatchPage />

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
const connectedLessonPage = connect(mapStateToProps)(LessonPage);
export { connectedLessonPage as LessonPage };

type LessonPlaneProps = {
    dispatch: any;
    lesson: object;
    user: User;
    lesson_users_progress: object | null;
    get_all_by_cup_id_lessons_users_progress: object | null;
    add_lessons_users_progress_loading: boolean,
    remove_lessons_users_progress_loading: boolean,
    edit_lessons_users_progress_loading: boolean,
    edit_lessons_users_progress_message: string | null,
    edit_lessons_users_progress_errors: Array<any> | null,
    edit_lessons_users_progress_error_message: string | null,
    edit_lessons_users_progress: Array<any> | null,
};

const LessonPlane: FunctionComponent<LessonPlaneProps> = ({
    dispatch,
    lesson,
    user,
    lesson_users_progress,
    get_all_by_cup_id_lessons_users_progress,
    add_lessons_users_progress_loading,
    remove_lessons_users_progress_loading,
    edit_lessons_users_progress_loading,
    edit_lessons_users_progress_message,
    edit_lessons_users_progress_errors,
    edit_lessons_users_progress_error_message,
    edit_lessons_users_progress,
}): JSX.Element => {
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [localError, setLocalError] = useState<string | null>(null)

    const [isOpenFinishLessonModal, setIsOpenFinishLessonModal] = useState<boolean>(false)
    const [lessonToFinishLessonModal, setLessonToFinishLessonModal] = useState<object | null>(null)

    useEffect(() => {
        const init = async () => {
            if (user) {
                if (lesson && lesson_users_progress === null) {
                    await dispatch(lessonsUsersProgressActions.add({
                        kk_lup_cup_id: lesson.course_users_progress.kk_cup_id,
                        kk_lup_course_id: lesson.kk_lesson_course_id,
                        kk_lup_lesson_id: lesson.kk_lesson_id,
                    }))
                } else await dispatch(lessonsUsersProgressActions.getAllByCupId({ kk_lup_cup_id: lesson_users_progress.kk_lup_cup_id }));
            }
        }
        init();
    }, []);

    const prefLesson = () => {
        if (lesson && lesson.course && lesson.course.lessons && lesson.course.lessons.length > 0) {
            let prefLesson = lesson.course.lessons.filter((item) => item.kk_lesson_number === lesson.kk_lesson_number - 1)[0];
            navigate(`/courses/${prefLesson.kk_lesson_course_id}/${prefLesson.kk_lesson_id}`)
        }
    }
    const nextLesson = () => {
        if (lesson_users_progress && lesson_users_progress.kk_lup_status === "finished") {
            if (lesson && lesson.course && lesson.course.lessons && lesson.course.lessons.length > 0) {
                let nextLesson = lesson.course.lessons.filter((item) => item.kk_lesson_number === lesson.kk_lesson_number + 1)[0];
                navigate(`/courses/${nextLesson.kk_lesson_course_id}/${nextLesson.kk_lesson_id}`)
            }
        } else if (lesson_users_progress && lesson_users_progress.kk_lup_status === "inprocess") setLocalError("Сначала вам необходимо пройди данный урок!");
    }

    const onSubmitFinishLessonForm = async (data) => {

        if (user) {
            await dispatch(lessonsUsersProgressActions.edit({
                kk_lup_id: lesson_users_progress.kk_lup_id,
                kk_lup_finished_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                kk_lup_status: 'finished',
                ...data
            }, async () => {
                // setIsOpenFinishLessonModal(true)
                // setLessonToFinishLessonModal(lesson_users_progress)
                await dispatch(lessonsUsersProgressActions.getAllByCupId({ kk_lup_cup_id: lesson_users_progress.kk_lup_cup_id }));

            }))

        } else navigate(`/registration`)

    }

    const onEdit = async () => {
        if (user) {
            await dispatch(lessonsUsersProgressActions.remove({ kk_lup_id: lesson_users_progress.kk_lup_id }))
            await dispatch(lessonsUsersProgressActions.add({
                kk_lup_cup_id: lesson.course_users_progress.kk_cup_id,
                kk_lup_course_id: lesson.kk_lesson_course_id,
                kk_lup_lesson_id: lesson.kk_lesson_id,
            }))
            await dispatch(lessonsActions.getOneByLessonId({
                kk_lesson_id: lesson.kk_lesson_id,
                kk_course_id: lesson.kk_lesson_course_id,
                parts: 'course,lessons,course_users_progress,questions,answers,user_answer',
                course_published: 1,
                lesson_published: 1,
                lessons_published: 1,
                parts_to_count: 'lessons'
            }))

        } else navigate(`/registration`)
    }

    return (
        <React.Fragment>
            {lesson &&
                <React.Fragment>
                    <h1 className={`lesson_page_title mb-3`}><span className={`text-primary`}>{lesson?.course?.kk_course_name}</span></h1>
                    <p dangerouslySetInnerHTML={{ __html: lesson?.course?.kk_course_description }}></p>
                    <h1 className={`lesson_page_title`}>Урок {lesson?.kk_lesson_number}. <span className={`text-primary`}>{lesson?.kk_lesson_name}</span></h1>
                    <FinishLessonModal
                        isOpen={isOpenFinishLessonModal}
                        setIsOpen={setIsOpenFinishLessonModal}
                        lesson={lesson_users_progress}
                        nextLesson={nextLesson}
                        onEdit={onEdit}
                        kk_course_id={lesson.kk_lesson_course_id}
                    />

                    <Row g={5}>
                        <Col xs={12} lg={10} className={`lesson_page_description`} dangerouslySetInnerHTML={{ __html: lesson.kk_lesson_description }}></Col>
                        <Col xs={12} lg={2} className={`lesson_page_sub_info_container`}>
                            <div className={`lesson_page_sub_info`}>
                                <div className={`lesson_page_sub_info_item`}><FileOutlineIcon /><b>Урок {lesson.kk_lesson_number}</b></div>
                                {/* <div className={`lesson_page_sub_info_item`}><FileOutlineIcon /><b>Урок {lesson.kk_lesson_number}</b></div> */}
                            </div>
                        </Col>
                        {lesson.kk_lesson_audio &&
                            <React.Fragment>
                                <Col xs={12} lg={7}>
                                    <div className={`lesson_page_audio_title`}>Аудио версия урока</div>
                                    <AudioPlayer src={lesson.kk_lesson_audio} />
                                </Col>
                                <Col xs={12} lg={5}>
                                    <div className={`lesson_page_audio_text`}>
                                        <ArrowLeftIcon />
                                        слушать аудио версию урока
                                    </div>
                                </Col>
                            </React.Fragment>
                        }
                        <Col xs={12} lg={12} dangerouslySetInnerHTML={{ __html: lesson.kk_lesson_text }}></Col>
                        <Form onSubmit={handleSubmit(onSubmitFinishLessonForm)}>
                            {user && lesson.questions && lesson.questions.length > 0 &&
                                <div className={`lesson_page_test_container`}>
                                    <h3 className={`lesson_page_test_title`}>Тест</h3>
                                    {lesson.questions.map((question, index) => <Question key={question.kk_question_id} question={question} register={register} errors={edit_lessons_users_progress_errors} />)}
                                </div>
                            }
                            {localError && <Alert message={localError} type={'danger'} className={`lesson_page_actions_error_alert`} />}
                            {edit_lessons_users_progress_error_message && <Alert message={edit_lessons_users_progress_error_message} type={'danger'} className={`lesson_page_actions_error_alert`} />}
                            <Row g={3} className={`mb-3`}>
                                <Col xs={12} lg={6}>
                                    <div className="lesson_page_actions_container">
                                        <IconButton type={`button`} className={`lesson_page_actions_prev_lesson`} icon={<ArrowSquareRightIcon />} onClick={prefLesson} disabled={lesson.kk_lesson_number <= 1 || add_lessons_users_progress_loading}>Предыдущий урок</IconButton>
                                        <IconButton type={`button`} className={`lesson_page_actions_next_lesson`} icon={<ArrowSquareRightIcon />} onClick={nextLesson} disabled={lesson.kk_lesson_number === lesson.course.lessons_count || add_lessons_users_progress_loading || !user}>Следующий урок</IconButton>
                                    </div>
                                </Col>
                                <Col xs={12} lg={6}>
                                    {lesson_users_progress?.kk_lup_status === 'finished' ?
                                        <div className={`lesson_page_finished_lesson_plane`}>
                                            <h5 className={`lesson_page_finished_lesson_plane_title`}>Урок пройден</h5>
                                            Дата и время прохождения: {moment(lesson_users_progress?.kk_lup_finished_at).locale('ru').format('Do MMMM YYYY, HH:mm')}
                                            {lesson.questions && lesson.questions.length > 0 && !hasTextQuestion(lesson.questions) && <p>Верных ответов: {getPercentageOfCorrectAnswers(lesson.questions)}</p>}
                                        </div>
                                        :
                                        <Button
                                            type="submit"
                                            loading={edit_lessons_users_progress_loading}
                                            disabled={edit_lessons_users_progress_loading}
                                            className={`lesson_page_submit_button`}
                                        >
                                            {lesson.questions && lesson.questions.length > 0 ? `Отправить на проверку` : `Пройти урок`}
                                        </Button>
                                    }
                                    <FinishCourseButton lesson={lesson} lessons_users_progress={get_all_by_cup_id_lessons_users_progress} />
                                </Col>
                            </Row>

                            {lesson_users_progress?.kk_lup_status === 'finished' &&
                                <Row g={3} >
                                    <Col xs={12} lg={6}><Button className="w-100" onClick={onEdit} loading={remove_lessons_users_progress_loading} disabled={remove_lessons_users_progress_loading || !(lesson.questions && lesson.questions.length > 0)}>Повторить тест</Button></Col>
                                    <Col xs={12} lg={6}><Button className="w-100" onClick={() => navigate(`/`)}>Завершить занятие</Button></Col>
                                    <Col xs={12} lg={6}><Button className="w-100" onClick={() => navigate(`/contacts`)}>Задать вопрос</Button></Col>
                                    <Col xs={12} lg={6}><Button className="w-100" onClick={() => dispatch(modalsActions.openDonateModal(true))}>Поддержать сайт</Button></Col>
                                    <Col xs={12} lg={12}>Поделиться:<br /><Share className={`mt-3`} link={`${config.appUrl}/courses/${lesson.kk_lesson_course_id}`} whatsapp viber telegram sms copy /></Col>
                                </Row>
                            }
                        </Form>
                    </Row>
                </React.Fragment>
            }
        </React.Fragment>
    );
}