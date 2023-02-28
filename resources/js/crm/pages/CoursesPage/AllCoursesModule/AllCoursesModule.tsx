import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { User } from '../../../_interfaces';
import '../index.css';
import { AllCoursesTable } from ".";

type AllCoursesModuleProps = { 
    dispatch: any; 
    user: User; 
    course_page_tab_table: number,
}

const AllCoursesModule: FunctionComponent<AllCoursesModuleProps> = ({ 
    dispatch, 
    user,
    course_page_tab_table,
}): JSX.Element => {

    return (
        <div className={`users_page_module`}>
            <AllCoursesTable kk_course_categoty_id={course_page_tab_table} />
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
const connectedAllCoursesModule = connect(mapStateToProps)(AllCoursesModule);
export { connectedAllCoursesModule as AllCoursesModule };

