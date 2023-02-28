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
    course_page_tab_table: number;
}

const MyCoursesModule: FunctionComponent<MyCoursesModuleProps> = ({
    dispatch,
    user,
    course_page_tab_table
}): JSX.Element => {

    return (
        <div className={`users_page_module`}>
            <MyCoursesTable kk_course_categoty_id={course_page_tab_table} />
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { course_page_tab_table } = state.courses;

    return {
        user,
        course_page_tab_table,
    };
}
const connectedMyCoursesModule = connect(mapStateToProps)(MyCoursesModule);
export { connectedMyCoursesModule as MyCoursesModule };

