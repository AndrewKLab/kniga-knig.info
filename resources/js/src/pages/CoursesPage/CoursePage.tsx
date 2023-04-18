import React, { FunctionComponent, useEffect } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, Image, Spoiler } from '../../../public/_components/UI';
import { FolderOutlineIcon, LockKeyOutlineIcon } from '../../../public/_components/UI/Icons';
import { CourseUserProgress, Lesson, LessonUserProgress, User } from '../../../public/_interfaces';
import { coursesActions, coursesUsersProgressActions } from "../../_actions";
import { useNavigate, useParams } from "react-router-dom";
import './index.css';
import { PageLoader } from "../../_components";
import { getLastInprocessLesson } from "../../_helpers";
import { modalsActions } from "../../../public/_actions";
import parse from 'html-react-parser';
import { localCoursesUserProgressHelper } from "../../../public/_helpers";

type CoursePageActionButtonProps = {
    className?: string;
    add_courses_users_progress_loading: boolean;
    remove_courses_users_progress_loading: boolean;
    get_one_by_course_id_courses: any,
    get_one_by_course_id_courses_users_progress: any,
    onClick: any
}

export const CoursePageActionButton: FunctionComponent<CoursePageActionButtonProps> = ({
    className,
    add_courses_users_progress_loading,
    remove_courses_users_progress_loading,
    get_one_by_course_id_courses,
    get_one_by_course_id_courses_users_progress,
    onClick
}): JSX.Element => {
    let navigate = useNavigate();
    return (
        get_one_by_course_id_courses_users_progress ? (
            get_one_by_course_id_courses_users_progress.kk_cup_status === "finished" ?
                <Button
                    className={className}
                    disabled={add_courses_users_progress_loading || remove_courses_users_progress_loading}
                    loading={add_courses_users_progress_loading || remove_courses_users_progress_loading}
                    onClick={() => onClick('restart')}>
                    Пройти еще раз
                </Button>
                : get_one_by_course_id_courses_users_progress.kk_cup_status === "inprocess" ? <Button className={className} onClick={() => navigate(`/courses/${get_one_by_course_id_courses.kk_course_id}/${get_one_by_course_id_courses_users_progress?.lessons_users_progress ? getLastInprocessLesson(get_one_by_course_id_courses?.lessons, get_one_by_course_id_courses_users_progress?.lessons_users_progress) : get_one_by_course_id_courses.lessons[0].kk_lesson_id}`)}>Перейти к курсу</Button> : <React.Fragment></React.Fragment>
        ) : <Button className={className} disabled={add_courses_users_progress_loading} loading={add_courses_users_progress_loading} onClick={() => onClick('start')}>Начать изучение</Button>
    );
}

type CoursePageProps = {
    dispatch: any;
    user: User;
    add_courses_users_progress_loading: boolean;
    add_courses_users_progress_message: string | null,
    add_courses_users_progress_error: string | null,
    add_courses_users_progress: object | null,

    remove_courses_users_progress_loading: boolean;
    remove_courses_users_progress_message: string | null,
    remove_courses_users_progress_error: string | null,
    remove_courses_users_progress: object | null,

    get_one_by_course_id_courses_loading: boolean;
    get_one_by_course_id_courses_message: string | null,
    get_one_by_course_id_courses_error: string | null,
    get_one_by_course_id_courses: any,

    get_one_by_course_id_courses_users_progress_loading: boolean;
    get_one_by_course_id_courses_users_progress_message: string | null,
    get_one_by_course_id_courses_users_progress_error: string | null,
    get_one_by_course_id_courses_users_progress: CourseUserProgress | null,
}

const CoursePage: FunctionComponent<CoursePageProps> = ({
    dispatch,
    user,
    add_courses_users_progress_loading,
    add_courses_users_progress_message,
    add_courses_users_progress_error,
    add_courses_users_progress,

    remove_courses_users_progress_loading,
    remove_courses_users_progress_message,
    remove_courses_users_progress_error,
    remove_courses_users_progress,

    get_one_by_course_id_courses_loading,
    get_one_by_course_id_courses_message,
    get_one_by_course_id_courses_error,
    get_one_by_course_id_courses,

    get_one_by_course_id_courses_users_progress_loading,
    get_one_by_course_id_courses_users_progress_message,
    get_one_by_course_id_courses_users_progress_error,
    get_one_by_course_id_courses_users_progress,
}): JSX.Element => {

    let navigate = useNavigate();
    let { kk_course_id } = useParams();

    useEffect(() => {
        const init = async () => {
            await dispatch(coursesActions.getOneByCourseId({ kk_course_id: kk_course_id, parts: 'category,lessons', parts_to_count: 'lessons', category_published: 1, courses_published: 1, lessons_published: 1 }))
            if (user) await dispatch(coursesUsersProgressActions.getOneByCourseId({ kk_cup_course_id: kk_course_id, parts: 'lessons_users_progress' }))
        }
        init();
    }, []);

    const handdleCourseButton = async (action) => {
        switch (action) {
            case 'start':
                await dispatch(coursesUsersProgressActions.add({ kk_cup_course_id: kk_course_id }))
                navigate(`/courses/${get_one_by_course_id_courses.kk_course_id}/${get_one_by_course_id_courses.lessons[0].kk_lesson_id}`)
                break;
            case 'stop':
                if (get_one_by_course_id_courses_users_progress) await dispatch(coursesUsersProgressActions.remove({ kk_cup_id: get_one_by_course_id_courses_users_progress.kk_cup_id }))
                break;
            case 'restart':
                if (get_one_by_course_id_courses_users_progress) await dispatch(coursesUsersProgressActions.remove({ kk_cup_id: get_one_by_course_id_courses_users_progress.kk_cup_id }))
                await dispatch(coursesUsersProgressActions.add({ kk_cup_course_id: kk_course_id }))
                navigate(`/courses/${get_one_by_course_id_courses.kk_course_id}/${get_one_by_course_id_courses.lessons[0].kk_lesson_id}`)
                break;
            default:
                console.error('Неизвестный тип действия!')
                break;
        }
    }

    interface LessonProgressIconProps { lesson: Lesson, lups?: LessonUserProgress[] }
    const LessonProgressIcon: FunctionComponent<LessonProgressIconProps> = ({ lesson, lups }): JSX.Element => {

        if (lups) {
            let lup = lups.filter((l) => l.kk_lup_lesson_id === lesson.kk_lesson_id)
            if (lup && lup.length > 0) {
                if (lup[0].kk_lup_status === 'finished') return <div className={`course_page_lessons_list_item_reactangle active`}></div>
                else if (lup[0].kk_lup_status === 'inprocess') return <div className={`course_page_lessons_list_item_reactangle`}></div>
            }
            return <LockKeyOutlineIcon size={20} />
        }
        else if (lesson.kk_lesson_number === 1) return <div className={`course_page_lessons_list_item_reactangle`}></div>
        return <LockKeyOutlineIcon size={20} />;
    }

    if (get_one_by_course_id_courses_loading || get_one_by_course_id_courses_users_progress_loading) return <PageLoader />
    return (get_one_by_course_id_courses &&
        <div className={`course_page`}>

            <h3 className={`course_page_title`}>КУРС: <span className={`text-primary`}>{get_one_by_course_id_courses.kk_course_name}</span></h3>
            <Row g={5} className={`course_page_course_card`}>
                <Col xs={12} sm={12} md={6}><Image className={`course_page_image`} src={`courses/${get_one_by_course_id_courses.kk_course_image}`} /></Col>
                <Col xs={12} sm={12} md={6}>
                    <div className={`course_page_course_info`}>
                        <div className={`course_page_course_lessons_count`}>
                            <FolderOutlineIcon />
                            <div className={`course_page_course_lessons_count_text`}>
                                {`${get_one_by_course_id_courses.lessons_count} уроков`}
                            </div>
                        </div>
                        {/* <div className={`course_page_course_time`}>
                            <TimerOutlineIcon />
                            <div className={`course_page_course_lessons_count_text`}>
                                {`${get_one_by_course_id_courses.lessons_count} уроков`}
                            </div>
                        </div> */}
                    </div>
                    <p className={`course_page_description`} dangerouslySetInnerHTML={{ __html: get_one_by_course_id_courses.kk_course_description }}></p>
                    <CoursePageActionButton
                        className={`course_page_button`}
                        add_courses_users_progress_loading={add_courses_users_progress_loading}
                        remove_courses_users_progress_loading={remove_courses_users_progress_loading}
                        get_one_by_course_id_courses={get_one_by_course_id_courses}
                        get_one_by_course_id_courses_users_progress={get_one_by_course_id_courses_users_progress ? get_one_by_course_id_courses_users_progress : (localCoursesUserProgressHelper.getOneCUPByCourseID(get_one_by_course_id_courses.kk_course_id))}
                        onClick={handdleCourseButton}
                    />
                </Col>

            </Row>
            <h2 className={`course_page_second_title`}>Программа курса</h2>
            {get_one_by_course_id_courses.lessons &&
                <div className={`course_page_lessons_list`}>
                    {get_one_by_course_id_courses.lessons.map((item: Lesson, index: number) => (
                        <div key={item.kk_lesson_id} className={`course_page_lessons_list_item`}>
                            <LessonProgressIcon lesson={item} lups={get_one_by_course_id_courses_users_progress?.lessons_users_progress ? get_one_by_course_id_courses_users_progress?.lessons_users_progress : (
                                localCoursesUserProgressHelper.getAllLUPByCourseID(item.kk_lesson_course_id)?.length > 0 ? localCoursesUserProgressHelper.getAllLUPByCourseID(item.kk_lesson_course_id) : []
                            )} />
                            <Spoiler
                                className={`course_page_lessons_list_item_spoiler`}
                                spoilerTitle={item.kk_lesson_name}
                                spoilerContent={item.kk_lesson_description ? parse(item.kk_lesson_description) : ''}
                            />
                        </div>
                    ))}
                </div>

            }

            <Row g={5} className={`course_page_course_card`}>
                <Col xs={12} sm={12} lg={6}><Button className="mt-3 " onClick={() => dispatch(modalsActions.openDonateModal(true))}>Поддержать сайт</Button></Col>
            </Row>
            {/* <Button className={`course_page_button mobile`}>Перейти к прохождению</Button> */}
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        get_one_by_course_id_courses_loading,
        get_one_by_course_id_courses_message,
        get_one_by_course_id_courses_error,
        get_one_by_course_id_courses,
    } = state.courses;
    const {
        add_courses_users_progress_loading,
        add_courses_users_progress_message,
        add_courses_users_progress_error,
        add_courses_users_progress,

        remove_courses_users_progress_loading,
        remove_courses_users_progress_message,
        remove_courses_users_progress_error,
        remove_courses_users_progress,

        get_one_by_course_id_courses_users_progress_loading,
        get_one_by_course_id_courses_users_progress_message,
        get_one_by_course_id_courses_users_progress_error,
        get_one_by_course_id_courses_users_progress,
    } = state.courses_users_progress;
    return {
        user,
        add_courses_users_progress_loading,
        add_courses_users_progress_message,
        add_courses_users_progress_error,
        add_courses_users_progress,

        remove_courses_users_progress_loading,
        remove_courses_users_progress_message,
        remove_courses_users_progress_error,
        remove_courses_users_progress,

        get_one_by_course_id_courses_loading,
        get_one_by_course_id_courses_message,
        get_one_by_course_id_courses_error,
        get_one_by_course_id_courses,

        get_one_by_course_id_courses_users_progress_loading,
        get_one_by_course_id_courses_users_progress_message,
        get_one_by_course_id_courses_users_progress_error,
        get_one_by_course_id_courses_users_progress,
    };
}
const connectedCoursePage = connect(mapStateToProps)(CoursePage);
export { connectedCoursePage as CoursePage };