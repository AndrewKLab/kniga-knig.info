import React, { FunctionComponent, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Image, Spoiler } from '../../../../public/_components/UI';
import { FolderOutlineIcon, LockKeyOutlineIcon } from '../../../../public/_components/UI/Icons';
import { Course, CourseUserProgress, Lesson, LessonUserProgress, User } from '../../../../public/_interfaces';
import { coursesActions, coursesUsersProgressActions } from "../../../_actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import './index.css';
import { PageLoader } from "../../../_components";
import { getLastInprocessLesson, stateInterface } from "../../../_helpers";
import { modalsActions } from "../../../../public/_actions";
import parse from 'html-react-parser';
import { localCoursesUserProgressHelper } from "../../../../public/_helpers";
import { coursesPromoActions } from "../../../../public/_store";
import { useAppDispatch } from "../../../_hooks";
import { PageAlert } from "../../../../public/_components/Alerts";
import { NoMatchPage } from "../../NoMatchPage";

type CoursesPromoPageProps = {
    get_all_courses_loading: boolean
    get_all_courses_message: string | null
    get_all_courses_error: string | null
    get_all_courses: Course[] | null
}

const CoursesPromoPage: FunctionComponent<CoursesPromoPageProps> = ({
    get_all_courses_loading,
    get_all_courses_message,
    get_all_courses_error,
    get_all_courses,
}): JSX.Element => {
    let { kk_cp_id } = useParams();
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        get_one_by_id_loading,
        get_one_by_id_error_message,
        get_one_by_id_course_promo,
    } = useSelector((state: stateInterface) => state.courses_promo);
    const [pageLoading, setPageLoading] = useState(true);
    const [showMoreLessons, setShowMoreLessons] = useState(false);

    useEffect(() => {
        const init = async () => {
            const course_promo = await dispatch(coursesPromoActions.getOneById({ kk_cp_id, parts: 'lessons' }));
            const courses = await dispatch(coursesActions.getAll({ parts: 'category', course_published: 1, category_published: 1 }))

            setPageLoading(false)
        }
        init();
    }, []);


    if (pageLoading || get_one_by_id_loading || get_all_courses_loading) return <PageLoader />
    else if (get_one_by_id_error_message) return <PageAlert type={'danger'} message={get_one_by_id_error_message} />
    else if (get_all_courses_error) return <PageAlert type={'danger'} message={get_all_courses_error} />
    else if (get_one_by_id_course_promo) return (
        <div className={`course_promo_page`}>
            <Row g={3} className={`course_promo_page_block mt-0 course_promo_page_green_block`}>
                <Col xs={12} lg={6} className={`order-lg-1 order-xs-2 `}>
                    <div className="course_promo_page_text_block">

                        <div >
                            <div className={`course_promo_page_sub_title`}>{get_one_by_id_course_promo.kk_cp_sub_name} </div>
                            <div className={`course_promo_page_title text-primary`}>{get_one_by_id_course_promo.kk_cp_name} </div>
                        </div>
                        <div>{get_one_by_id_course_promo.kk_cp_description}</div>
                        <Button className={`course_promo_page_button`} onClick={() => navigate(`/courses/${get_one_by_id_course_promo.kk_cp_course_id}`)}>Начать курс</Button>
                    </div>
                </Col>
                <Col xs={12} lg={6} className={`order-lg-2 order-xs-1`}>
                    <div className="course_promo_page_image_center_container">
                        <Image src={`courses/${get_one_by_id_course_promo.kk_cp_image}`} />
                    </div>
                </Col>
            </Row>
            <Row g={3} className={"course_promo_page_block"}>
                <Col xs={12} lg={12}>
                    <h2 className={`course_promo_page_title`}><span className={`text-primary`}>Чему вы</span> научитесь</h2>
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
            <Row g={3} className={`course_promo_page_block course_promo_page_green_block`}>
                <Col xs={12} lg={8} className={`order-lg-1 order-xs-2 `}>
                    <div className="course_promo_page_text_block">

                        <div className={`course_promo_page_title`}>
                            <span className={`text-primary`}>Слушайте</span> и изучайте
                        </div>

                        <div style={{ paddingRight: '18rem' }}>
                            К каждому занятию курса прилагается аудио версия. Теперь проходить уроки стало ещё удобнее!
                        </div>
                    </div>
                </Col>
                <Col xs={12} lg={4} className={`order-lg-2 order-xs-1`}>
                    <div className="d-flex flex-column justify-content-center h-100">
                        <Image src={`site/audio_book2_02-01 1.png`} />
                    </div>
                </Col>
            </Row>
            <Row g={3} className={"course_promo_page_block"}>
                <Col xs={12} lg={12} className={`mt-0`}>
                    <h2 className={`course_promo_page_title`}><span className={`text-primary`}>Программа</span> курса</h2>
                </Col>
                <Col xs={12} lg={12}>
                    {get_one_by_id_course_promo.lessons &&
                        <div className={`course_page_lessons_list`}>
                            {get_one_by_id_course_promo.lessons.map((item: Lesson, index: number) => (
                                <React.Fragment key={item.kk_lesson_id}>
                                    {index < 4 ? (
                                        <div className={`course_page_lessons_list_item`}>
                                            <LockKeyOutlineIcon size={20} />
                                            <Spoiler
                                                className={`course_page_lessons_list_item_spoiler`}
                                                spoilerTitle={item.kk_lesson_name}
                                                spoilerContent={item.kk_lesson_description ? parse(item.kk_lesson_description) : ''}
                                            />
                                        </div>
                                    ) : (showMoreLessons && <div className={`course_page_lessons_list_item`}>
                                        <LockKeyOutlineIcon size={20} />
                                        <Spoiler
                                            className={`course_page_lessons_list_item_spoiler`}
                                            spoilerTitle={item.kk_lesson_name}
                                            spoilerContent={item.kk_lesson_description ? parse(item.kk_lesson_description) : ''}
                                        />
                                    </div>
                                    )}
                                    {!showMoreLessons && index === 3 && <Button className={`course_promo_page_button m-auto`} onClick={() => setShowMoreLessons(!showMoreLessons)}>Посмотреть все</Button>}
                                    {showMoreLessons && index === get_one_by_id_course_promo.lessons?.length - 1 && <Button className={`course_promo_page_button m-auto`} onClick={() => setShowMoreLessons(!showMoreLessons)}>Свернуть список</Button>}
                                </React.Fragment>
                            ))}
                        </div>
                    }
                </Col>
            </Row>
            <Row g={3} className={`course_promo_page_block course_promo_page_green_block`}>
                <Col xs={12} lg={12} className={`mt-0`}>
                    <h2 className={`course_promo_page_title m-0`}><span className={`text-primary`}>руководитель</span> курса</h2>
                </Col>
                <Col xs={12} lg={4} >
                    <div className="course_promo_page_image_center_container">
                        <Image src={`site/Mask group.png`} />
                    </div>
                </Col>
                <Col xs={12} lg={8} >
                    <div className={`course_promo_page_text_block`} style={{ paddingLeft: '2rem' }}>
                        <div>
                            Приглашаю всех, кто ищет путь к более глубокой вере, пройти вместе со мной курс Священного Писания “Верую”. Я готов поделиться с вами своими знаниями, опытом и верой. После окончания курса вы обретете более глубокие познания Библии и расширите свое понимание о Боге. Это приглашение открыто для всех, кто стремится к духовному росту и поиску истины. Не упустите возможность пройти этот важный путь вместе и преисполнится светом духовного познания.
                        </div>
                        <div>
                            <b>Рустем Мухаметвалеев</b><br />
                            <span style={{ fontSize: '12px' }}>Пастор, магистр богословия, директор медиахолдинга “Надежда”</span>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row g={3} className={"course_promo_page_block"}>
                <Col xs={12} lg={12}>
                    <h2 className={`course_promo_page_title`}><span className={`text-primary`}>Из чего</span> состоит курс?</h2>
                </Col>
                <Col xs={12} lg={3}>
                    <ul>
                        <li>
                            <b>Онлайн уроков</b><br />
                            <span>10 интерактивных онлайн уроков на платформе “Книга-Книг”</span>
                        </li>
                    </ul>
                </Col>
                <Col xs={12} lg={3}>
                    <ul>
                        <li>
                            <b>Вебинары</b><br />
                            <span>Прямые эфиры со спикером</span>
                        </li>
                    </ul>
                </Col>
                <Col xs={12} lg={3}>
                    <ul>
                        <li>
                            <b>Индивидуальная консультация</b><br />
                            <span>Вы можете обратиться за помощью к куратору курса</span>
                        </li>
                    </ul>
                </Col>
                <Col xs={12} lg={3}>
                    <ul>
                        <li>
                            <b>Общениe со студентами</b><br />
                            <span>Получите доступ к сообществу студентов “Книга-книг”</span>
                        </li>
                    </ul>
                </Col>

            </Row>
            <Row g={3} className={"course_promo_page_block"}>
                <Col xs={12} lg={12}>
                    <h2 className={`course_promo_page_title mt-0`}><span className={`text-primary`}>Другие</span> курсы</h2>
                </Col>
                {get_all_courses && get_all_courses.map((item: Course, index: number) => (
                    <Col key={item.kk_course_id} xs={12} lg={6} >
                        <Link to={`/courses/${item.kk_course_id}`}>
                            <Image className="w-100" src={`courses/${item.kk_course_image}`} />
                            <div className={`course_promo_page_course_list_item_title`}>{item.kk_course_name}</div>
                        </Link>
                    </Col>
                ))}

            </Row>
        </div>
    )
    else return <NoMatchPage />

}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        get_all_courses_loading,
        get_all_courses_message,
        get_all_courses_error,
        get_all_courses,
    } = state.courses;
    return {
        user,
        get_all_courses_loading,
        get_all_courses_message,
        get_all_courses_error,
        get_all_courses,
    };
}
const connectedCoursesPromoPage = connect(mapStateToProps)(CoursesPromoPage);
export { connectedCoursesPromoPage as CoursesPromoPage };