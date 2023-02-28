import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { TabsMenu } from '../../../_components/UI';
import { PartLoader, } from '../../../_components';

import { User } from '../../../_interfaces';
import './index.css';
import { coursesActions, coursesCategoriesActions } from "../../../_actions";

type AllCoursesModulesListProps = { 
    dispatch: any; 
    user: User; 
    get_all_courses_categories_loading: boolean;
    get_all_courses_categories_message: string|null;
    get_all_courses_categories_error: string|null;
    get_all_courses_categories: object[];

    course_page_tab_table: number;
}

const AllCoursesModulesList: FunctionComponent<AllCoursesModulesListProps> = ({ 
    dispatch, 
    user,
    get_all_courses_categories_loading,
    get_all_courses_categories_message,
    get_all_courses_categories_error,
    get_all_courses_categories,

    course_page_tab_table

}): JSX.Element => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            await dispatch(coursesCategoriesActions.getAll())
            setLoading(false)
        }
        init();
    }, []);


    if (loading || get_all_courses_categories_loading) return <PartLoader />
    return (
        <div className={`header_navbar_drawer_modules_list`}>
            <TabsMenu 
            activeTab={course_page_tab_table} 
            setActiveTab={(table)=>dispatch(coursesActions.setCoursesPageTabTable(table))} 
            tabs={get_all_courses_categories && get_all_courses_categories.length > 0 ? get_all_courses_categories.map((category, index) => { return { key: category.kk_cc_id, menuTitle: category.kk_cc_name } }) : []} />
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { course_page_tab_table } = state.courses;
    const {
        get_all_courses_categories_loading,
        get_all_courses_categories_message,
        get_all_courses_categories_error,
        get_all_courses_categories,
    } = state.courses_categories
    return {
        user,
        get_all_courses_categories_loading,
        get_all_courses_categories_message,
        get_all_courses_categories_error,
        get_all_courses_categories,

        course_page_tab_table
    };
}
const connectedAllCoursesModulesList = connect(mapStateToProps)(AllCoursesModulesList);
export { connectedAllCoursesModulesList as AllCoursesModulesList };