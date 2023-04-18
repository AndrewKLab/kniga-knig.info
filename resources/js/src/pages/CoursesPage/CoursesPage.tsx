import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button } from '../../../public/_components/UI';
import { CoursesCard } from '../../_components';

import { User } from '../../_interfaces';
import { coursesCategoriesActions, coursesActions } from "../../_actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import './index.css';
import { DonateModal } from "../../../public/_components";

type CoursesPageProps = {
    dispatch: any;
    user: User;
    get_all_courses_categories_loading: boolean;
    get_all_courses_categories_message: string | null,
    get_all_courses_categories_error: string | null,
    get_all_courses_categories: any,
}

const CoursesPage: FunctionComponent<CoursesPageProps> = ({
    dispatch,
    user,

    get_all_courses_categories_loading,
    get_all_courses_categories_message,
    get_all_courses_categories_error,
    get_all_courses_categories,
}): JSX.Element => {
    const [isOpenDonationModal, setIsOpenDonationModal] = useState<boolean>(false)
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    let selected_course_category = searchParams.get('selected_course_category')
    const [selectedCourseCategory, setSelectedCourseCategory] = useState(selected_course_category ? selected_course_category : 1);

    useEffect(() => {
        const init = async () => {
            await dispatch(coursesCategoriesActions.getAll({ parts: 'courses', parts_to_count: 'lessons', category_published: 1, courses_published: 1, lessons_published: 1 }))
        }
        init();
    }, []);

    return (
        <div className={`courses_page`}>
            <h3 className={`courses_page_title`}>Все <span className={`text-primary`}>Курсы</span></h3>
            <div className={`courses_page_subtitle`}>Выбирайте любой курс, который Вам нравится</div>
            {get_all_courses_categories &&
                <React.Fragment>
                    <div className={`courses_page_categories_list`}>
                        {get_all_courses_categories.map((item, index) => <a key={item.kk_cc_id} className={`courses_page_categories_list_item${selectedCourseCategory == item.kk_cc_id ? ` active` : ''}`} onClick={() => setSelectedCourseCategory(item.kk_cc_id)}>{item.kk_cc_name}</a>)}
                    </div>
                    <div className={`courses_page_courses_list`}>
                        {get_all_courses_categories.map((item, index) => (
                            <div key={item.kk_cc_id} className={`courses_page_courses_list_item${selectedCourseCategory == item.kk_cc_id ? ` active` : ''}`}>
                                <Row g={4}>
                                    {item.courses && item.courses.map((item, index) => (
                                        <Col key={item.kk_course_id} xs={12} sm={12} md={6} className={`cursor-pointer`} onClick={() => navigate(`/courses/${item.kk_course_id}`)}>
                                            <CoursesCard
                                                course={item}
                                                coursesCardImage={item.kk_course_image}
                                                coursesCardTitle={item.kk_course_name}
                                                coursesCardText={item.kk_course_description}
                                                coursesCardSubtitle={`${item.lessons_count} уроков`}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ))}
                    </div>

                </React.Fragment>
            }
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const {
        get_all_courses_categories_loading,
        get_all_courses_categories_message,
        get_all_courses_categories_error,
        get_all_courses_categories,
    } = state.courses_categories;
    return {
        user,

        get_all_courses_categories_loading,
        get_all_courses_categories_message,
        get_all_courses_categories_error,
        get_all_courses_categories,
    };
}
const connectedCoursesPage = connect(mapStateToProps)(CoursesPage);
export { connectedCoursesPage as CoursesPage };