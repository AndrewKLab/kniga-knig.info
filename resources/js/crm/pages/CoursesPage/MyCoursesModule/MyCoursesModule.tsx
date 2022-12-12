import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Button, TabsMenu } from '../../../_components/UI';
import { PageLoader, } from '../../../_components';

import { User } from '../../../_interfaces';
import { useNavigate, useSearchParams } from "react-router-dom";
import '../index.css';
import { MyCoursesTable } from ".";
import { coursesCategoriesActions } from "../../../_actions";

type MyCoursesModuleProps = { 
    dispatch: any; 
    user: User; 
    get_all_courses_categories_loading: boolean;
    get_all_courses_categories_message: string | null,
    get_all_courses_categories_error: string | null,
    get_all_courses_categories: any,
}

const MyCoursesModule: FunctionComponent<MyCoursesModuleProps> = ({ 
    dispatch, 
    user,
    get_all_courses_categories_loading,
    get_all_courses_categories_message,
    get_all_courses_categories_error,
    get_all_courses_categories,

}): JSX.Element => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(1)

    useEffect(() => {
        const init = async () => {
            await dispatch(coursesCategoriesActions.getAll())
            setLoading(false)
        }
        init();
    }, []);


    if (loading || get_all_courses_categories_loading) return <PageLoader />
    return (
        <div className={`users_page_module`}>
            <TabsMenu activeTab={activeTab} setActiveTab={setActiveTab} tabs={get_all_courses_categories && get_all_courses_categories.length > 0 ? get_all_courses_categories.map((category, index) => { return { key: category.kk_cc_id, menuTitle: category.kk_cc_name } }) : []} />
            <MyCoursesTable kk_course_categoty_id={activeTab} />
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
const connectedMyCoursesModule = connect(mapStateToProps)(MyCoursesModule);
export { connectedMyCoursesModule as MyCoursesModule };

