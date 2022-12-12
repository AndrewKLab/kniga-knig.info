import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Image, Button, Carusel, CaruselItem } from '../../_components/UI';
import { CoursesCard } from '../../_components';

import { User } from '../../_interfaces';
import { coursesCategoriesActions, coursesActions } from "../../_actions";
import { useNavigate } from "react-router-dom";
import './index.css';

type HomePageProps = {
    dispatch: any;
    user: User;
    get_all_courses_loading: boolean;
    get_all_courses_message: string | null,
    get_all_courses_error: string | null,
    get_all_courses: object | null,

    get_one_by_category_id_courses_categories_loading: boolean;
    get_one_by_category_id_courses_categories_message: string | null,
    get_one_by_category_id_courses_categories_error: string | null,
    get_one_by_category_id_courses_categories: object | null,
}

const HomePage: FunctionComponent<HomePageProps> = ({
    dispatch,
    user,

    get_all_courses_loading,
    get_all_courses_message,
    get_all_courses_error,
    get_all_courses,

    get_one_by_category_id_courses_categories_loading,
    get_one_by_category_id_courses_categories_message,
    get_one_by_category_id_courses_categories_error,
    get_one_by_category_id_courses_categories,
}): JSX.Element => {
    let navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            await dispatch(coursesActions.getAll({ parts: 'category', parts_to_count: 'lessons', course_published: 1, category_published: 1, lessons_published: 1 }))
            await dispatch(coursesCategoriesActions.getOneByCategoryId({ kk_cc_id: 2, parts: 'courses', parts_to_count: 'lessons', category_published: 1, courses_published: 1, lessons_published: 1 }))
        }
        init();
    }, []);

    return (
        <div className={`home_page`}>
            {/* <div className={`home_page_shapes`}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div> */}
            <div className={`home_page_title_container`}>
                <h1 className={`home_page_title`}>
                    <div>Научитесь</div>
                    <div className={`text-primary`}>Понимать</div>
                    <div className={`text-primary`} >Библию</div>
                    <div>Онлайн</div>
                </h1>
            </div>
            <div className={`home_page_description`}>
                <div className={`home_page_description_first_part`}>Выбирайте любой<br />курс, который<br />вам нравится</div>
                <div className={`home_page_description_second_part`}>Занимайтесь<br />самостоятельно<br />или с консультантом</div>
            </div>
            <div className={`home_page_information`}>
                <div className={`home_page_information_first_part`}>
                    <Image src={`site/Img-1.png`} />
                </div>
                <div className={`home_page_information_second_part`}>
                    <Image className={`home_page_information_second_part_image`} src={`site/Img-2.png`} />
                    <Image className={`home_page_information_second_part_image_mobile`} src={`site/Img-4.png`} />
                    <Button className={`home_page_information_second_part_button`} onClick={() => navigate('/courses')}>Посмотреть курсы</Button>

                    <div className={`home_page_information_second_part_text`}>
                        <h2 className={`home_page_information_title`}><span className={`text-primary`}>Что делать,</span> если у меня<br /> возникнут <span className={`text-primary`}>вопросы?</span></h2>
                        <ul className={`home_page_information_second_part_list`}>
                            <li>Если у вас возникли вопросы Вы всегда можете обратиться к нашим консультантам в переписке на сайте</li>
                            <li>Все наши консультанты имеют высшее богословское образование и с удовольствием помогут вам</li>
                        </ul>
                    </div>
                </div>
                <div className={`home_page_information_third_part`}>
                    <div className={`home_page_information_third_part_text`}>
                        <h2 className={`home_page_information_title`}><span className={`text-primary`}>Как выбрать </span><br />подходящий <span className={`text-primary`}>курс?</span></h2>
                        <ul className={`home_page_information_third_part_list`}>
                            <li>Как и в любой школе, обучение на портале имеет разные ступени</li>
                            <li>Начав учиться, вы зачисляетесь на основную (базовую) ступень, где вам доступны уроки об основных вопросах Библии</li>
                            <li>Следующие ступени предлагают углублённое изучение отдельных тем или книг Библии</li>
                            <li>Существуют специальные курсы по семье и здоровью. Портал постоянно пополняется!</li>
                        </ul>
                        <Button className={`home_page_information_third_part_button`} onClick={() => navigate('/courses')}>Выбрать курс</Button>
                    </div>
                    <Image className={`home_page_information_third_part_image cursor-pointer`} src={`site/Img-5.png`} onClick={() => navigate('/courses')} />
                </div>
                {get_all_courses && <Carusel
                    className={`home_page_first_carousel`}
                    caruselTitle={<h2><span className={`text-primary`}>Новые</span> курсы </h2>}
                    caruselViewMore={`Смотреть ещё`}
                    caruselViewMoreAction={() => navigate('/courses')}
                    caruselItems={get_all_courses}
                    caruselSettings={{
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        renderBottomCenterControls: false,
                        cellAlign: 'left',
                        cellSpacing: 31,
                        wrapAround: true
                    }}
                    caruselRenderItem={(item, index) => (
                        <CaruselItem key={item.kk_course_id} onClick={() => navigate(`/courses/${item.kk_course_id}`)} >
                            <CoursesCard
                                coursesCardImage={item.kk_course_image}
                                coursesCardTitle={item.kk_course_name}
                                coursesCardText={item.kk_course_description}
                                coursesCardSubtitle={`${item.lessons_count} уроков`}
                            />
                        </CaruselItem>
                    )
                    }
                />}
                {get_one_by_category_id_courses_categories && <Carusel
                    className={`home_page_second_carousel`}
                    caruselTitle={<h2><span className={`text-primary`}>{get_one_by_category_id_courses_categories.kk_cc_name}</span> курсы </h2>}
                    caruselViewMore={`Смотреть ещё`}
                    caruselViewMoreAction={() => navigate(`/courses?selected_course_category=${get_one_by_category_id_courses_categories.kk_cc_id}`)}
                    caruselItems={get_one_by_category_id_courses_categories.courses}
                    caruselSettings={{
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        renderBottomCenterControls: false,
                        cellAlign: 'left',
                        cellSpacing: 31,
                        wrapAround: true
                    }}
                    caruselRenderItem={(item, index) => (
                        <CaruselItem key={item.kk_course_id} onClick={() => navigate(`/courses/${item.kk_course_id}`)}>
                            <CoursesCard
                                coursesCardImage={item.kk_course_image}
                                coursesCardTitle={item.kk_course_name}
                                coursesCardText={item.kk_course_description}
                                coursesCardSubtitle={`${item.lessons_count} уроков`}
                            />
                        </CaruselItem>
                    )
                    }
                />}

            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        get_all_courses_loading,
        get_all_courses_message,
        get_all_courses_error,
        get_all_courses,
    } = state.courses;
    const {
        get_one_by_category_id_courses_categories_loading,
        get_one_by_category_id_courses_categories_message,
        get_one_by_category_id_courses_categories_error,
        get_one_by_category_id_courses_categories,
    } = state.courses_categories;
    return {
        user,

        get_all_courses_loading,
        get_all_courses_message,
        get_all_courses_error,
        get_all_courses,

        get_one_by_category_id_courses_categories_loading,
        get_one_by_category_id_courses_categories_message,
        get_one_by_category_id_courses_categories_error,
        get_one_by_category_id_courses_categories,
    };
}
const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };