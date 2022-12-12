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
}

const CoursesPage: FunctionComponent<CoursesPageProps> = ({
    dispatch,
    user,
}): JSX.Element => {
    const [activeTab, setActiveTab] = useState(1)
    let navigate = useNavigate();
    const modules = [];
    if (
        user?.role?.kk_role_type === 'ROLE_SUPER_ADMIN' ||
        user?.role?.kk_role_type === 'ROLE_ADMIN' ||
        user?.role?.kk_role_type === 'ROLE_COORDINATOR'
    ) modules.push({ key: 0, menuTitle: 'Курсы', module: <AllCoursesModule /> })
    if (true) modules.push({ key: 1, menuTitle: 'Мои Курсы', module: <MyCoursesModule /> })
    // if (true) modules.push({ key: 2, menuTitle: 'Пользователи Без', module: <WithoutCoursesModule /> })

    const ActiveTab = () => {
        const module = modules.find(element => element.key === activeTab);
        return module.module;
    }

    return (
        <div className={`users_page`}>
            <div className={`courses_page_header`}>
                <TabsMenu className={`users_page_modules_tabs`} activeTab={activeTab} setActiveTab={setActiveTab} tabs={modules} />
                <Button color={'primary'} className={`courses_page_header_button`} onClick={() => navigate(`/courses/constructor/add`)}>Добавить</Button>
            </div>

            <ActiveTab />
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return { user };
}
const connectedCoursesPage = connect(mapStateToProps)(CoursesPage);
export { connectedCoursesPage as CoursesPage };