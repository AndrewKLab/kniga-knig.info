import React, { FunctionComponent, useState } from "react";
import { connect } from 'react-redux';
import { User } from '../../_interfaces';
import './index.css';
import { AllCoursesModule, MyCoursesModule } from "./";
import { Button, TabsMenu } from "../../_components/UI";
import { useNavigate } from "react-router-dom";

type CoursesPageProps = {
    dispatch: any;
    user: User;
    course_page_tab: number;
}

const CoursesPage: FunctionComponent<CoursesPageProps> = ({
    dispatch,
    user,
    course_page_tab
}): JSX.Element => {
    let navigate = useNavigate();
    const modules = [];
    if (
        user?.role?.kk_role_type === 'ROLE_SUPER_ADMIN' ||
        user?.role?.kk_role_type === 'ROLE_ADMIN' ||
        user?.role?.kk_role_type === 'ROLE_COORDINATOR'
    ) modules.push({ key: 0, menuTitle: 'Курсы', module: <AllCoursesModule /> })
    if (user?.role?.kk_role_level < 6) modules.push({ key: 1, menuTitle: 'Мои Курсы', module: <MyCoursesModule /> })

    const ActiveTab = () => {
        let tab = course_page_tab ? course_page_tab : modules[0].key;
        const module = modules.find(element => element.key === tab);
        return module.module;
    }

    return (
        <div className={`users_page`}>
            <div className={`courses_page_header`}>
                <Button color={'primary'} className={`courses_page_header_button`} onClick={() => navigate(`/courses/constructor/add`)}>Добавить</Button>
            </div>

            <ActiveTab />
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { course_page_tab } = state.courses;
    return { user, course_page_tab };
}
const connectedCoursesPage = connect(mapStateToProps)(CoursesPage);
export { connectedCoursesPage as CoursesPage };