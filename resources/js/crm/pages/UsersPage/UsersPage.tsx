import React, { FunctionComponent, useState } from "react";
import { connect } from 'react-redux';
import { User } from '../../_interfaces';
import './index.css';
import { AllUsersModule, MyUsersModule, WithoutUsersModule } from "./";
import { Button, TabsMenu } from "../../_components/UI";
import { useNavigate } from "react-router-dom";
import { MyUsersTreeModule } from "./MyUsersTreeModule";

type UsersPageProps = {
    dispatch: any;
    user: User;
    user_page_tab?: number;
}

const UsersPage: FunctionComponent<UsersPageProps> = ({
    dispatch,
    user,
    user_page_tab,
}): JSX.Element => {
    let navigate = useNavigate();
    const modules = [];
    if (
        user?.role?.kk_role_type === 'ROLE_SUPER_ADMIN' ||
        user?.role?.kk_role_type === 'ROLE_ADMIN' ||
        user?.role?.kk_role_type === 'ROLE_COORDINATOR'
    ) modules.push({ key: 0, menuTitle: 'Пользователи', module: <AllUsersModule /> })
    if (true) modules.push({ key: 1, menuTitle: 'Мои Пользователи', module: <MyUsersModule /> })
    if (true) modules.push({ key: 2, menuTitle: 'Пользователи Без', module: <WithoutUsersModule /> })
    if (true) modules.push({ key: 3, menuTitle: 'Древо ваших связей', module: <MyUsersTreeModule /> })

    const ActiveTab = () => {
        let tab = user_page_tab ? user_page_tab : modules[0].key;
        const module = modules.find(element => element.key === tab);
        return module.module;
    }

    return (
        <div className={`users_page`}>
            {user_page_tab !== 3 && <div className={`courses_page_header`}>
                <Button color={'primary'} className={`courses_page_header_button`} onClick={() => navigate(`/users/action/add`)}>Добавить</Button>
            </div>}
            <ActiveTab />
        </div>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { user_page_tab } = state.users;
    return { user, user_page_tab };
}
const connectedUsersPage = connect(mapStateToProps)(UsersPage);
export { connectedUsersPage as UsersPage };