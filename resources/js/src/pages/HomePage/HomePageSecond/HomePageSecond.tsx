import React, { FunctionComponent, useEffect } from "react";
import { connect } from 'react-redux';
import { Image, Button, Carusel, CaruselItem, Row, Col } from '../../../../public/_components/UI';
import { AutorCard, CoursesCard } from '../../../_components';

import { User } from '../../../_interfaces';
import { coursesCategoriesActions, coursesActions } from "../../../_actions";
import { useNavigate } from "react-router-dom";
import './index.css';
import { modalsActions } from "../../../../public/_actions";
import { ChevronRightIcon } from "../../../../public/_components/UI/Icons";
import { Course } from "../../../../public/_interfaces";
import { PartLoader } from "../../../../public/_components";
import { config } from "../../../../public/_helpers";
import parse from 'html-react-parser';

type HomePageSecondProps = {
    dispatch: any;
    user: User;
    get_all_courses_loading: boolean;
    get_all_courses_message: string | null,
    get_all_courses_error: string | null,
    get_all_courses: Course[] | null,

    get_one_by_course_id_courses_loading: boolean;
    get_one_by_course_id_courses_message: string | null,
    get_one_by_course_id_courses_error: string | null,
    get_one_by_course_id_courses: Course | null,
}

const HomePageSecond: FunctionComponent<HomePageSecondProps> = ({
    dispatch,
    user,

    get_all_courses_loading,
    get_all_courses_message,
    get_all_courses_error,
    get_all_courses,

    get_one_by_course_id_courses_loading,
    get_one_by_course_id_courses_message,
    get_one_by_course_id_courses_error,
    get_one_by_course_id_courses,
}): JSX.Element => {
    let navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            await dispatch(coursesActions.getAll({ parts: 'category', parts_to_count: 'lessons', course_published: 1, category_published: 1, lessons_published: 1 }))
            await dispatch(coursesActions.getOneByCourseId({ kk_course_id: 197, parts: 'category', parts_to_count: 'lessons', course_published: 1, category_published: 1, lessons_published: 1 }))
        }
        init();
    }, []);

    return (
        <div className={`home_page_second`}>
            <div className="home_page_second_shadow_1"></div>
            <div className="home_page_second_shadow_2"></div>
            <div className="home_page_second_shadow_3"></div>
            <div className="home_page_second_shadow_4"></div>
            <div className="home_page_second_shadow_5"></div>
            <Row g={3} className={`home_page_second_block `}>
                <Col xs={12} lg={7} className={`order-lg-1 order-xs-2 `}>
                    <div className="home_page_second_text_block">
                        <div>
                            <div className={`home_page_second_main_title`}>Исследуйте</div>
                            <div className={`home_page_second_title_sub_container`} >
                                <div className={`home_page_second_sub_title`}>Присоединяйтесь<br /> к нам</div>
                                <div className={`home_page_second_main_title text-primary`} >ГЛУБИНЫ</div>
                            </div>

                            <div className={`home_page_second_main_title`}>КНИГИ КНИГ!</div>
                            <div className={`home_page_second_sub_title text-center`}>И РАСШИРЬТЕ СВОИ<br /> ЗНАНИЯ О БИБЛИИ</div>

                            {/* <div className={`home_page_second_text home_page_second_hello_block_desc`}>Присоединяйтесь к нашим онлайн-курсам и расширьте свои знания о Библии!</div> */}
                        </div>
                        <div className={`d-flex justify-content-center`}>
                            <Button className={`home_page_second_button home_page_second_button_with_chevron`} onClick={() => navigate('/courses')}>
                                Смотреть все
                                <ChevronRightIcon className="home_page_second_button_icon"></ChevronRightIcon>
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col xs={12} lg={5} className={`order-lg-2 order-xs-1`}>
                    <Image src={`site/home_page_image_1.webp`} className={`home_page_second_hello_block_img`} />
                </Col>
            </Row>

            {/* <Row g={3} className="home_page_second_block">
                <Col xs={12} lg={6} >
                    <div className={`home_page_second_title`}>
                        <span className={`text-primary`}>лучшая онлайн-<br />школа</span> для изучения Библии
                    </div>
                </Col>
                <Col xs={12} lg={6} >
                    <div className={`home_page_second_text`}>Уникальные библейские курсы богословия, разработанные вместе с экспертами и авторами перевода Библии на русский язык, позволят тебе раскрыть глубины своей веры и узнать больше о богословских темах, а преподаватели Заокского  университета обеспечат качественное обучение.</div>
                </Col>
            </Row> */}
            {get_all_courses_loading && <Row g={3} className="home_page_second_block"><Col xs={12} lg={12} ><PartLoader /></Col></Row>}
            {
                get_all_courses && <Row g={3} className="home_page_second_block home_page_second_green_block home_page_second_courses_block">
                    <Carusel
                        className={`home_page_second_first_carousel`}
                        caruselTitle={<div className={`home_page_second_title`}><span className={`text-primary`}>Разгадайте тайны</span> КНИГИ книг</div>}
                        caruselViewMoreAction={() => navigate('/courses')}
                        caruselItems={get_all_courses}
                        caruselSettings={{
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            renderBottomCenterControls: false,
                            cellAlign: 'left',
                            cellSpacing: 31,
                            wrapcenter: true
                        }}
                        caruselRenderItem={(item, index) => (
                            <CaruselItem key={item.kk_course_id} onClick={() => navigate(`/courses/${item.kk_course_id}`)} >
                                <CoursesCard coursesCardImage={item.kk_course_image} dontShare />
                            </CaruselItem>
                        )
                        }
                    />


                    <Col xs={12} lg={12} >
                        <div className={`d-flex justify-content-center`}>
                            <Button className={`home_page_second_button home_page_second_button_with_chevron`} onClick={() => navigate('/courses')}>
                                Смотреть все
                                <ChevronRightIcon className="home_page_second_button_icon"></ChevronRightIcon>
                            </Button>
                        </div>
                    </Col>
                </Row>
            }

            <Row g={3} className="home_page_second_block">
                <Col xs={12} lg={12} >
                    <div className={`home_page_second_title`}>
                        <span className={`text-primary`}>Авторы</span> курсов
                    </div>
                </Col>
                <Col xs={12} lg={12} >
                    <Carusel
                        className={`home_page_second_first_carousel`}
                        // caruselTitle={<div className={`home_page_second_title`}><span className={`text-primary`}>Разгадайте тайны</span> КНИГИ-книг</div>}
                        caruselViewMoreAction={() => navigate('/courses')}
                        caruselItems={[
                            {
                                title: `Рустем Мухаметвалеев`,
                                desctiption: `Пастор, магистр богословия, директор медиахолдинга “Надежда”`,
                                img: `site/2 2.png`,
                            },
                            {
                                title: `Павел Жуков`,
                                desctiption: `Пастор, магистр богословия`,
                                img: `site/Rectangle 3.png`,
                            },
                            {
                                title: `Евгений Зайцев`,
                                desctiption: `директор Института Перевода Библии в Заокском`,
                                img: `site/Group 3(5).png`,
                            },
                            {
                                title: `Иван Лобанов`,
                                desctiption: `главный редактор Института Перевода Библии в Заокском`,
                                img: `site/Group 3(3).png`,
                            },
                            {
                                title: `Юрий Волобоев`,
                                desctiption: `пастор, магистр богословия`,
                                img: `site/Group 3(4).png`,
                            },
                        ]}
                        caruselSettings={{
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            renderBottomCenterControls: false,
                            cellAlign: 'left',
                            cellSpacing: 31,
                            wrapcenter: true
                        }}
                        caruselRenderItem={(item, index) => (
                            <AutorCard
                                className={`home_page_second_text`}
                                title={item.title}
                                desctiption={item.desctiption}
                                img={item.img}
                            />

                        )
                        }
                    />

                </Col>
            </Row>

            {get_one_by_course_id_courses_loading && <Row g={3} className="home_page_second_block"><Col xs={12} lg={12} ><PartLoader /></Col></Row>}

            {
                get_one_by_course_id_courses && <Row g={3} className={`home_page_second_block home_page_second_green_block`}>
                    <Col xs={12} lg={6} className={`order-lg-1 order-xs-2 `}>
                        <div className="home_page_second_text_block">

                            <div className={`home_page_second_title home_page_second_title_margins`}>
                                <span className={`text-primary`}>{get_one_by_course_id_courses.kk_course_name} </span>
                            </div>

                            <div className={`home_page_second_text home_page_second_hello_block_desc home_page_second_course_desciption`}>{parse(get_one_by_course_id_courses.kk_course_description)}</div>

                            <Button className={`home_page_second_button`} onClick={() => navigate(`/courses/${get_one_by_course_id_courses.kk_course_id}`)}>Посмотреть курс</Button>
                        </div>
                    </Col>
                    <Col xs={12} lg={6} className={`order-lg-2 order-xs-1`}>
                        <div className="d-flex flex-column justify-content-center h-100">
                            <Image src={`courses/${get_one_by_course_id_courses.kk_course_image}`} />
                        </div>
                    </Col>
                </Row>
            }



            <Row g={3} className={`home_page_second_block `}>
                <Col xs={12} lg={6} className={`order-lg-1 order-xs-2`}>
                    <div className="d-flex flex-column justify-content-center h-100">
                        {/* <Image src={`site/обложки ТГБ 2-03 2.png`} className={`home_page_second_hello_block_img`} /> */}
                        <video className={`home_page_second_video`} controls src={`${config.appUrl}/assets/video/site/Книга Книг Туториал.mov`} poster={`${config.appUrl}/assets/img/site/home_page_bible.png`}>
                            Sorry, your browser doesn't support embedded videos,
                            but don't worry, you can <a href="videofile.ogg">download it</a>
                            and watch it with your favorite video player!
                        </video>
                    </div>
                </Col>
                <Col xs={12} lg={6} className={`order-lg-2 order-xs-1`}>
                    <div className="home_page_second_text_block">

                        <div className={`home_page_second_title home_page_second_title_margins`}>
                            <span className={`text-primary`}>Как изучать </span><br />Библию?
                        </div>

                        <div className={`home_page_second_text home_page_second_hello_block_desc`}>В этом видео мы расскажем как изучать Библию на нашем сайте Книга-книг</div>

                    </div>
                </Col>

            </Row>

            <Row g={3} className={`home_page_second_block home_page_second_green_block`}>
                <Col xs={12} lg={6} className={`order-lg-1 order-xs-2 `}>
                    <div className="home_page_second_text_block">

                        <div className={`home_page_second_title home_page_second_title_margins`}>
                            <span className={`text-primary`}>Поддержите </span> проект
                        </div>

                        <div className={`home_page_second_text home_page_second_hello_block_desc`}>Ваше пожертвование - это поддержка нашего проекта и вклад в общее благо. Вы помогаете нам продолжать делиться ценными знаниями Библии со всеми желающими.Вместе мы создаем сообщество, в котором каждый может получить поддержку и помощь в своем духовном развитии.</div>

                        <Button className={`home_page_second_button`} onClick={() => dispatch(modalsActions.openDonateModal(true))}>Поддержать</Button>
                    </div>
                </Col>
                <Col xs={12} lg={6} className={`order-lg-2 order-xs-1`}>
                    <div className="d-flex flex-column justify-content-center h-100">
                        <Image src={`site/home_page_image_4.png`} className={`home_page_second_hello_block_img`} height={'400px'} />
                    </div>
                </Col>
            </Row>
        </div >
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        get_all_courses_loading,
        get_all_courses_message,
        get_all_courses_error,
        get_all_courses,

        get_one_by_course_id_courses_loading,
        get_one_by_course_id_courses_message,
        get_one_by_course_id_courses_error,
        get_one_by_course_id_courses,
    } = state.courses;

    return {
        user,

        get_all_courses_loading,
        get_all_courses_message,
        get_all_courses_error,
        get_all_courses,

        get_one_by_course_id_courses_loading,
        get_one_by_course_id_courses_message,
        get_one_by_course_id_courses_error,
        get_one_by_course_id_courses,
    };
}
const connectedHomePageSecond = connect(mapStateToProps)(HomePageSecond);
export { connectedHomePageSecond as HomePageSecond };