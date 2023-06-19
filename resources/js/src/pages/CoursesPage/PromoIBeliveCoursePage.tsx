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

type PromoIBeliveCoursePageActionButtonProps = {
    className?: string;
    add_courses_users_progress_loading: boolean;
    remove_courses_users_progress_loading: boolean;
    get_one_by_course_id_courses: any,
    get_one_by_course_id_courses_users_progress: any,
    onClick: any
}

export const PromoIBeliveCoursePageActionButton: FunctionComponent<PromoIBeliveCoursePageActionButtonProps> = ({
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
        ) : <Button className={className} disabled={add_courses_users_progress_loading} loading={add_courses_users_progress_loading} onClick={() => onClick('start')}>Записаться на курс</Button>
    );
}

type PromoIBeliveCoursePageProps = {
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

const PromoIBeliveCoursePage: FunctionComponent<PromoIBeliveCoursePageProps> = ({
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
            await dispatch(coursesActions.getOneByCourseId({ kk_course_id: kk_course_id, parts: 'category,lessons', parts_to_count: 'lessons', category_published: 1, courses_published: 1, lessons_published: 1, }))
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
        <div className={`course_page promo_course_page`}>

            <Row g={3} className={`home_page_second_block home_page_second_green_block`}>
                <Col xs={12} lg={6} className={`order-lg-1 order-xs-2 `}>
                    <div className="home_page_second_text_block">

                        <div className={`home_page_second_title home_page_second_title_margins`}>
                            <span className={`text-primary`}>{get_one_by_course_id_courses.kk_course_name} </span>
                        </div>

                        <div className={`home_page_second_text home_page_second_hello_block_desc home_page_second_course_desciption`}>
                            {/* {parse(get_one_by_course_id_courses.kk_course_description)} */}
                            Изучение Библии - удивительный процесс, который помогает найти ответы на глубокие жизненные вопросы и укрепить веру. Наш курс поможет обрести духовную мудрость и применять учения в жизни.
                        </div>

                        <PromoIBeliveCoursePageActionButton
                            className={`home_page_second_button promo_course_page_button`}
                            add_courses_users_progress_loading={add_courses_users_progress_loading}
                            remove_courses_users_progress_loading={remove_courses_users_progress_loading}
                            get_one_by_course_id_courses={get_one_by_course_id_courses}
                            get_one_by_course_id_courses_users_progress={get_one_by_course_id_courses_users_progress ? get_one_by_course_id_courses_users_progress : (localCoursesUserProgressHelper.getOneCUPByCourseID(get_one_by_course_id_courses.kk_course_id))}
                            onClick={handdleCourseButton}
                        />
                    </div>
                </Col>
                <Col xs={12} lg={6} className={`order-lg-2 order-xs-1`}>
                    <div className="d-flex flex-column justify-content-center h-100">
                        <Image src={`site/Frame.png`} />
                    </div>
                </Col>
            </Row>

            <Row g={3} className={"home_page_second_block"}>
                <Col xs={12} lg={12}>
                    <h2 className={`course_page_second_title`}><span className={`text-primary`}>Чему вы</span> научитесь</h2>
                </Col>
                <Col xs={12} lg={6}>
                    <Row g={3}>
                        <Col xs={12} lg={4} className={'d-flex justify-content-center'}>
                            <Image src={`site/twemoji_exclamation-question-mark.png`} />
                        </Col>
                        <Col xs={12} lg={8}>
                            <b>Ответы на глубокие жизненные вопросы</b><br /><br />
                            Расширите знания и получите ответы на самые глубокие жизненные вопросы, чтобы научиться жить более осознанной и наполненной жизнью.
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} lg={6}>
                    <Row g={3}>
                        <Col xs={12} lg={4} className={'d-flex justify-content-center'}>
                            <Image src={`site/twemoji_exclamation-question-mark(3).png`} />
                        </Col>
                        <Col xs={12} lg={8}>
                            <b>Укрепите свою веру и духовную связь с Богом</b><br /><br />
                            Укрепите духовную связь с Богом и обретете глубокую духовную мудрость, чтобы научиться принимать решения на основе веры и убеждений.
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} lg={6}>
                    <Row g={3}>
                        <Col xs={12} lg={4} className={'d-flex justify-content-center'}>
                            <Image src={`site/twemoji_exclamation-question-mark(1).png`} />
                        </Col>
                        <Col xs={12} lg={8}>
                            <b>Обретете духовную мудрость</b><br /><br />
                            Разовьете навыки милосердия, терпимости и любви к окружающим людям, чтобы стать более добрым и эмпатичным человеком.
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} lg={6}>
                    <Row g={3}>
                        <Col xs={12} lg={4} className={'d-flex justify-content-center'}>
                            <Image src={`site/twemoji_exclamation-question-mark(2).png`} />
                        </Col>
                        <Col xs={12} lg={8}>
                            <b>Сможет применять учения Библии в повседневной жизни</b><br /><br />
                            Умение применять принципы Библии в повседневной жизни, чтобы улучшить отношения с семьей, друзьями и коллегами, а также стать успешнее и счастливее.
                        </Col>
                    </Row>
                </Col>
            </Row>


            <Row g={3} className={"home_page_second_block"}>
                <Col xs={12} lg={12}>
                    <h2 className={`course_page_second_title`}><span className={`text-primary`}>Программа</span> курса</h2>
                </Col>
                <Col xs={12} lg={12}>
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
                </Col>
            </Row>

            <Row g={3} className={`home_page_second_block home_page_second_green_block`}>
                <Col xs={12} lg={12} className="course_page_second_title">
                    <h2 className={` m-0`}><span className={`text-primary`}>автор</span> курса</h2>
                </Col>
                <Col xs={12} lg={4} >
                    <div className="d-flex flex-column justify-content-center h-100">
                        <Image src={`site/Mask group.png`} />
                    </div>

                </Col>
                <Col xs={12} lg={8} >
                    <div style={{ marginBottom: '46px' }}>
                        <b>Рустем Мухаметвалеев</b><br />
                        <span style={{ fontSize: '12px' }}>Пастор, магистр богословия, директор медиахолдинга “Надежда”</span>
                    </div>
                    <div>
                        Рустем Мухаметвалеев - опытный пастор, магистр богословия, который имеет многолетний опыт преподавания и служения в церкви. Он является вдохновляющим преподавателем и лидером, которому доверяют люди со всего мира благодаря его глубокой экспертизе и пониманию Священного Писания. Рустем готов поделиться своими знаниями, опытом и мудростью с теми, кто ищет путь к более глубокой и осознанной вере. Наши студенты могут быть уверены, что получат качественное обучение от выдающегося спикера и пастора, который любит свою работу и предан служению Богу и людям.
                    </div>
                </Col>
            </Row>

            <Row g={3} className={"home_page_second_block"}>
                <Col xs={12} lg={12}>
                    <h2 className={`course_page_second_title`}><span className={`text-primary`}>Из чего</span> состоит курс?</h2>
                </Col>
                <Col xs={12} lg={3}>
                    <ul>
                        <li>
                            <b>Онлайн уроков</b><br/>
                            <span>10 интерактивных онлайн уроков на платформе “Книга-Книг”</span>
                        </li>
                    </ul>
                </Col>
                <Col xs={12} lg={3}>
                    <ul>
                        <li>
                            <b>Вебинары</b><br/>
                            <span>Прямые эфиры со спикером</span>
                        </li>
                    </ul>
                </Col>
                <Col xs={12} lg={3}>
                    <ul>
                        <li>
                            <b>Индивидуальная консультация</b><br/>
                            <span>Вы можете обратиться за помощью к куратору курса</span>
                        </li>
                    </ul>
                </Col>
                <Col xs={12} lg={3}>
                    <ul>
                        <li>
                            <b>Общениe со студентами</b><br/>
                            <span>Получите доступ к сообществу студентов “Книга-книг”</span>
                        </li>
                    </ul>
                </Col>

            </Row>

            <Row g={3} className={`home_page_second_block home_page_second_green_block`}>
                <Col xs={12} lg={6} className={`order-lg-1 order-xs-2 `}>
                    <div className="home_page_second_text_block">

                        <div className={`home_page_second_title home_page_second_title_margins`}>
                            <span className={`text-primary`}>Поддержите </span> проект
                        </div>

                        <div className={`home_page_second_text home_page_second_hello_block_desc`}>Ваши пожертвования помогают нам продолжать делиться знаниями Библии со всеми желающими познать глубины Книги книг. Пусть Бог обильно благословит вас, мы регулярно молимся о наших спонсорах.</div>

                        <Button className={`home_page_second_button`} onClick={() => dispatch(modalsActions.openDonateModal(true))}>Поддержать</Button>
                    </div>
                </Col>
                <Col xs={12} lg={6} className={`order-lg-2 order-xs-1`}>
                    <div className="d-flex flex-column justify-content-center h-100">
                        <Image src={`site/home_page_image_4.png`} className={`home_page_second_hello_block_img`} height={'400px'} style={{objectFit:'contain'}} />
                    </div>
                </Col>
            </Row>
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
const connectedPromoIBeliveCoursePage = connect(mapStateToProps)(PromoIBeliveCoursePage);
export { connectedPromoIBeliveCoursePage as PromoIBeliveCoursePage };